'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { analyticsSchema, pageCategory } from './events';

const CONSENT_KEY = 'articcus.analytics-consent';
export function Analytics({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<'yes' | 'no' | 'undecided' | null>(
    null,
  );
  const accepted = useRef(false);
  const loaded = useRef(false);
  useEffect(() => {
    if (!enabled) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {
      /* Consent can still be held in memory. */
    }
    const timer = setTimeout(
      () =>
        setConsent(stored === 'yes' || stored === 'no' ? stored : 'undecided'),
      0,
    );
    const settings = () => setConsent('undecided');
    window.addEventListener('articcus:analytics-settings', settings);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('articcus:analytics-settings', settings);
    };
  }, [enabled]);

  useEffect(() => {
    accepted.current = enabled && consent === 'yes';
    if (!accepted.current) return;
    const send = (input: unknown) => {
      if (!accepted.current) return;
      const result = analyticsSchema.safeParse(input);
      if (!result.success) return;
      void fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
        keepalive: true,
      }).catch(() => {
        /* Measurement must never interrupt the visitor. */
      });
    };
    const event = (message: Event) => {
      if (
        !(message instanceof CustomEvent) ||
        !message.detail ||
        typeof message.detail !== 'object'
      )
        return;
      send({ ...message.detail, page: pageCategory(location.pathname) });
    };
    const click = (message: MouseEvent) => {
      const link =
        message.target instanceof Element
          ? message.target.closest<HTMLAnchorElement>('a[data-discovery]')
          : null;
      if (link)
        send({
          name: 'discovery_click',
          page: pageCategory(location.pathname),
        });
    };
    send({ name: 'page_view', page: pageCategory(pathname) });
    window.addEventListener('articcus:event', event);
    document.addEventListener('click', click);
    if (!loaded.current) {
      loaded.current = true;
      void import('web-vitals').then(({ onCLS, onINP, onLCP }) => {
        const report = (metric: { name: string; value: number }) =>
          send({
            name: 'web_vital',
            page: pageCategory(location.pathname),
            metric: metric.name,
            value: metric.value,
          });
        onCLS(report);
        onINP(report);
        onLCP(report);
      });
    }
    return () => {
      window.removeEventListener('articcus:event', event);
      document.removeEventListener('click', click);
      accepted.current = false;
    };
  }, [consent, enabled, pathname]);

  function choose(value: 'yes' | 'no') {
    setConsent(value);
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* Storage may be unavailable. */
    }
  }
  if (!enabled || consent !== 'undecided') return null;
  return (
    <section
      className="consent-panel"
      aria-labelledby="analytics-consent-title"
    >
      <h2 id="analytics-consent-title">Help us improve this website?</h2>
      <p>
        With your permission, we measure page categories, enquiries completed
        and loading performance. We do not include names, email addresses or
        your message in these measurements.
      </p>
      <p>
        <Link href="/privacy">Read about website measurement</Link>
      </p>
      <div className="consent-actions">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => choose('yes')}
        >
          Allow measurement
        </button>
        <button
          className="btn btn-outline"
          type="button"
          onClick={() => choose('no')}
        >
          No thanks
        </button>
      </div>
    </section>
  );
}

export function AnalyticsSettings() {
  return (
    <button
      className="privacy-settings"
      type="button"
      onClick={() =>
        window.dispatchEvent(new Event('articcus:analytics-settings'))
      }
    >
      Measurement preferences
    </button>
  );
}
