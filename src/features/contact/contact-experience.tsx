'use client';

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { isIndustryId } from '@/data/catalogue';
import { Icon } from '@/components/ui/icon';
import { useBrief } from '@/features/brief/brief-provider';
import { ContactFields } from './contact-fields';
import { BriefSummary } from './brief-summary';
import { briefText } from './brief-text';
import {
  leadSchema,
  validationErrors,
  type Lead,
  type LeadErrors,
} from './lead-schema';

interface Receipt {
  reference: string;
  lead: Lead;
}

export function ContactExperience() {
  const brief = useBrief();
  const [errors, setErrors] = useState<LeadErrors>({});
  const [pending, setPending] = useState(false);
  const [facts, setFacts] = useState({
    size: '',
    timing: '',
    contact: 'Email',
  });
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [fallback, setFallback] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);
  const fallbackRef = useRef<HTMLTextAreaElement>(null);
  const inFlight = useRef(false);
  const abort = useRef<AbortController | null>(null);
  const attempt = useRef<{ body: string; key: string } | null>(null);
  useEffect(() => () => abort.current?.abort(), []);
  useEffect(() => {
    if (receipt) successRef.current?.focus();
  }, [receipt]);
  useEffect(() => {
    if (fallback) {
      fallbackRef.current?.focus();
      fallbackRef.current?.select();
    }
  }, [fallback]);

  function onChange(event: ChangeEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const values = new FormData(form);
    setFacts({
      size: String(values.get('size') || ''),
      timing: String(values.get('timing') || ''),
      contact: String(values.get('contact') || 'Email'),
    });
    const target = event.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement
    ) {
      const key = target.name as keyof Lead;
      setErrors((current) => {
        const updated = { ...current };
        delete updated[key];
        delete updated.form;
        if (key === 'problem') delete updated.services;
        return updated;
      });
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const read = (name: string) => String(values.get(name) || '');
    const parsed = leadSchema.safeParse({
      services: brief.services,
      industry: brief.industry,
      size: read('size'),
      timing: read('timing'),
      problem: read('problem'),
      budget: read('budget'),
      name: read('name'),
      company: read('company'),
      email: read('email'),
      phone: read('phone'),
      contact: read('contact') || 'Email',
      website: read('website'),
    });
    if (!parsed.success) {
      const nextErrors = validationErrors(parsed.error);
      setErrors(nextErrors);
      const field = Object.keys(nextErrors)[0];
      form
        .querySelector<HTMLElement>(
          field === 'services' ? '#ck-website' : `[name="${field}"]`,
        )
        ?.focus();
      return;
    }
    setErrors({});
    inFlight.current = true;
    setPending(true);
    const controller = new AbortController();
    abort.current = controller;
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const body = JSON.stringify(parsed.data);
      if (attempt.current?.body !== body)
        attempt.current = { body, key: crypto.randomUUID() };
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': attempt.current.key,
        },
        body,
        signal: controller.signal,
      });
      const result: unknown = await response.json();
      if (
        !response.ok ||
        !result ||
        typeof result !== 'object' ||
        !('reference' in result) ||
        typeof result.reference !== 'string'
      ) {
        const message =
          result &&
          typeof result === 'object' &&
          'message' in result &&
          typeof result.message === 'string'
            ? result.message
            : 'We could not send your brief. Please try again or email hello@articcus.com.';
        throw new Error(message);
      }
      setReceipt({ reference: result.reference, lead: parsed.data });
      brief.clear();
    } catch (error) {
      setErrors({
        form:
          error instanceof Error && error.name !== 'AbortError'
            ? error.message
            : 'Your request timed out. Please try again or email hello@articcus.com.',
      });
    } finally {
      clearTimeout(timer);
      abort.current = null;
      inFlight.current = false;
      setPending(false);
    }
  }

  async function copy() {
    if (!receipt) return;
    try {
      await navigator.clipboard.writeText(
        briefText(receipt.lead, receipt.reference),
      );
      brief.notify('Brief copied');
    } catch {
      setFallback(true);
    }
  }

  return (
    <div className="start-grid">
      <div className="fcard">
        {receipt ? (
          <div className="done" id="done">
            <span className="done-ic">
              <Icon name="check" />
            </span>
            <h3 className="h3" id="done-title" tabIndex={-1} ref={successRef}>
              Thanks, {receipt.lead.name.split(/\s+/)[0]}. Your brief is in.
            </h3>
            <p id="done-text">
              We will{' '}
              {receipt.lead.contact === 'Email'
                ? `email you at ${receipt.lead.email}`
                : receipt.lead.contact === 'WhatsApp'
                  ? `message you on WhatsApp at ${receipt.lead.phone}`
                  : `call you on ${receipt.lead.phone}`}{' '}
              within one working day to book your free 30-minute discovery call.
            </p>
            <p>
              Your reference:{' '}
              <span className="ref" id="done-ref">
                {receipt.reference}
              </span>
            </p>
            <div className="done-actions">
              <button
                type="button"
                className="btn btn-primary"
                id="copy-brief"
                onClick={copy}
              >
                Copy my brief
              </button>
              <button
                type="button"
                className="btn btn-outline"
                id="new-brief"
                onClick={() => {
                  brief.clear();
                  setReceipt(null);
                  setFallback(false);
                  setErrors({});
                  setFacts({ size: '', timing: '', contact: 'Email' });
                  document.getElementById('start-title')?.focus();
                }}
              >
                Start another brief
              </button>
            </div>
            <label className="sr-only" htmlFor="copy-box">
              Your brief as text
            </label>
            <textarea
              className="input copy-box"
              id="copy-box"
              readOnly
              hidden={!fallback}
              value={briefText(receipt.lead, receipt.reference)}
              ref={fallbackRef}
            />
          </div>
        ) : (
          <ContactFields
            onIndustryChange={(value) =>
              brief.setIndustry(
                isIndustryId(value) || value === 'other' ? value : '',
              )
            }
            onSubmit={onSubmit}
            onChange={onChange}
            errors={errors}
            pending={pending}
            industry={brief.industry}
            contact={facts.contact}
          />
        )}
      </div>
      <BriefSummary
        submitted={receipt?.lead}
        size={receipt?.lead.size || facts.size}
        timing={receipt?.lead.timing || facts.timing}
      />
    </div>
  );
}
