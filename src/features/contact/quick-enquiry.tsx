'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { leadSchema, validationErrors, type LeadErrors } from './lead-schema';
import { submitLead } from './submit-lead';
import { trackEvent } from '@/features/analytics/events';

export function QuickEnquiry() {
  const [errors, setErrors] = useState<LeadErrors>({});
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState('');
  const busy = useRef(false);
  const attempt = useRef<{ body: string; key: string } | null>(null);
  const abort = useRef<AbortController | null>(null);
  const receiptRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => () => abort.current?.abort(), []);
  useEffect(() => {
    if (reference) receiptRef.current?.focus();
  }, [reference]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (key: string) => String(data.get(key) || '');
    const parsed = leadSchema.safeParse({
      mode: 'enquiry',
      services: [],
      industry: '',
      size: '',
      timing: '',
      budget: '',
      phone: '',
      contact: 'Email',
      name: read('name'),
      email: read('email'),
      company: read('company'),
      problem: read('problem'),
      website: read('website'),
    });
    if (!parsed.success) {
      const next = validationErrors(parsed.error);
      setErrors(next);
      form
        .querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)
        ?.focus();
      return;
    }
    busy.current = true;
    setPending(true);
    setErrors({});
    trackEvent('enquiry_submit');
    const controller = new AbortController();
    abort.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const body = JSON.stringify(parsed.data);
      if (attempt.current?.body !== body)
        attempt.current = { body, key: crypto.randomUUID() };
      setReference(
        await submitLead(parsed.data, attempt.current.key, controller.signal),
      );
      trackEvent('enquiry_success');
    } catch (error) {
      setErrors({
        form:
          error instanceof Error && error.name !== 'AbortError'
            ? error.message
            : 'Your request timed out. Please try again or email hello@articcus.com.',
      });
      trackEvent('enquiry_error');
    } finally {
      clearTimeout(timeout);
      abort.current = null;
      busy.current = false;
      setPending(false);
    }
  }

  return (
    <section
      className="sec tight-top"
      id="enquiry"
      aria-labelledby="enquiry-title"
    >
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">A quick first conversation</p>
          <h2 className="h2" id="enquiry-title">
            Request a discovery call
          </h2>
          <p className="lead">
            Tell us what you need in a few sentences. You do not need to choose
            a service or prepare a technical brief.
          </p>
        </div>
        <div className="enquiry-grid">
          <div className="fcard">
            {reference ? (
              <div className="done">
                <h3 className="h3" tabIndex={-1} ref={receiptRef}>
                  Your enquiry has been received
                </h3>
                <p>
                  We aim to reply to your email within one working day to agree
                  the next step and a suitable time to talk.
                </p>
                <p>
                  Your reference: <strong>{reference}</strong>
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setReference('');
                    setErrors({});
                    attempt.current = null;
                    document.getElementById('enquiry-title')?.focus();
                  }}
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form
                className="enquiry-form"
                id="quick-enquiry-form"
                noValidate
                onSubmit={send}
                onChange={(event) => {
                  const field = event.target;
                  if (
                    field instanceof HTMLInputElement ||
                    field instanceof HTMLTextAreaElement
                  )
                    setErrors((current) => {
                      const next = { ...current };
                      delete next[field.name as keyof LeadErrors];
                      delete next.form;
                      return next;
                    });
                }}
              >
                <p className="field-hint">
                  Fields marked “Required” must be completed.
                </p>
                <div className="row2">
                  <div className="field">
                    <label htmlFor="q-name">
                      Full name <span className="required-label">Required</span>
                    </label>
                    <input
                      className="input"
                      id="q-name"
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={120}
                      aria-invalid={!!errors.name}
                      aria-describedby="q-name-error"
                    />
                    <p className="err" id="q-name-error">
                      {errors.name}
                    </p>
                  </div>
                  <div className="field">
                    <label htmlFor="q-email">
                      Email <span className="required-label">Required</span>
                    </label>
                    <input
                      className="input"
                      id="q-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      aria-invalid={!!errors.email}
                      aria-describedby="q-email-error"
                    />
                    <p className="err" id="q-email-error">
                      {errors.email}
                    </p>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="q-company">
                    Company <span className="opt">(optional)</span>
                  </label>
                  <input
                    className="input"
                    id="q-company"
                    name="company"
                    autoComplete="organization"
                    maxLength={200}
                  />
                </div>
                <div className="field">
                  <label htmlFor="q-problem">
                    What would you like to improve?{' '}
                    <span className="required-label">Required</span>
                  </label>
                  <textarea
                    className="input"
                    id="q-problem"
                    name="problem"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={4}
                    placeholder="For example, we enter every order twice and want a simpler process."
                    aria-invalid={!!errors.problem}
                    aria-describedby="q-problem-error"
                  />
                  <p className="err" id="q-problem-error">
                    {errors.problem}
                  </p>
                </div>
                <div hidden>
                  <label htmlFor="q-website">Leave this empty</label>
                  <input
                    id="q-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={pending}
                >
                  {pending ? 'Sending…' : 'Request a discovery call'}
                </button>
                <p className="privacy-notice">
                  We use your details to respond to this enquiry.{' '}
                  <Link href="/privacy">How we handle your information</Link>.
                </p>
                <p className="form-status" role="alert">
                  {errors.form}
                </p>
              </form>
            )}
          </div>
          <aside className="reading-aside">
            <h3 className="h3">What happens next</h3>
            <ol className="content-list">
              <li>We review the problem and get back to you.</li>
              <li>
                We arrange a free 30-minute discovery conversation if there is a
                useful fit.
              </li>
              <li>
                We agree whether the next step is a small project, discovery, or
                another approach.
              </li>
            </ol>
            <p>
              A request is not a confirmed appointment. We arrange a time with
              you by email.
            </p>
            <Link href="/contact#start" className="link-arrow">
              Already know the scope? Build a brief.
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
