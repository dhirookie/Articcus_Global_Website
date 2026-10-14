import { afterEach, describe, expect, it, vi } from 'vitest';
import { analyticsSchema, pageCategory } from '@/features/analytics/events';
import { leadSchema } from '@/features/contact/lead-schema';
import { createRateLimiter } from '@/server/rate-limit';
import { readJson, RequestBodyError } from '@/server/request-body';
import { SERVICE_DETAILS } from '@/data/service-details';
import { SOLUTION_EXAMPLES } from '@/data/solution-examples';
import { GUIDES } from '@/data/guides';
import { POST as recordEvent } from '@/app/api/events/route';

const enquiry = {
  mode: 'enquiry',
  name: 'Jane',
  email: 'jane@example.com',
  company: '',
  problem: 'We enter every order twice.',
  services: [],
  industry: '',
  size: '',
  timing: '',
  budget: '',
  phone: '',
  contact: 'Email',
};
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('short enquiries', () => {
  it('does not require a service or company to start a conversation', () =>
    expect(leadSchema.safeParse(enquiry).success).toBe(true));
  it('requires meaningful context', () =>
    expect(leadSchema.safeParse({ ...enquiry, problem: 'Hi' }).success).toBe(
      false,
    ));
  it('preserves the detailed brief requirements', () =>
    expect(leadSchema.safeParse({ ...enquiry, mode: 'brief' }).success).toBe(
      false,
    ));
});
describe('privacy-safe measurement', () => {
  it.each(['email', 'name', 'phone', 'company', 'problem', 'reference', 'url'])(
    'rejects unexpected %s fields',
    (key) =>
      expect(
        analyticsSchema.safeParse({
          name: 'enquiry_success',
          page: 'contact',
          [key]: 'private',
        }).success,
      ).toBe(false),
  );
  it('accepts bounded web vitals', () =>
    expect(
      analyticsSchema.safeParse({
        name: 'web_vital',
        page: 'home',
        metric: 'LCP',
        value: 1800,
      }).success,
    ).toBe(true));
  it('requires numeric performance data for web vitals', () =>
    expect(
      analyticsSchema.safeParse({ name: 'web_vital', page: 'home' }).success,
    ).toBe(false));
  it('removes unknown path details through categorisation', () =>
    expect(pageCategory('/private/customer-email')).toBe('other'));
  it('does not transmit anything when no receiver is configured', async () => {
    vi.stubEnv('ANALYTICS_WEBHOOK_URL', '');
    const send = vi.fn();
    vi.stubGlobal('fetch', send);
    expect(
      (
        await recordEvent(
          new Request('http://localhost/api/events', { method: 'POST' }),
        )
      ).status,
    ).toBe(204);
    expect(send).not.toHaveBeenCalled();
  });
  it('forwards only validated events with server-only authentication', async () => {
    vi.stubEnv('ANALYTICS_WEBHOOK_URL', 'https://metrics.example/events');
    vi.stubEnv('ANALYTICS_WEBHOOK_TOKEN', 'private-token');
    const send = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));
    vi.stubGlobal('fetch', send);
    const request = new Request('http://localhost/api/events', {
      method: 'POST',
      headers: {
        origin: 'http://localhost',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name: 'enquiry_success', page: 'contact' }),
    });
    expect((await recordEvent(request)).status).toBe(204);
    expect(send.mock.calls[0]?.[1].headers.Authorization).toBe(
      'Bearer private-token',
    );
  });
});
describe('bounded server requests', () => {
  it('rejects bodies larger than the limit even without Content-Length', async () => {
    await expect(
      readJson(
        new Request('http://localhost', {
          method: 'POST',
          body: 'x'.repeat(2100),
        }),
        2048,
      ),
    ).rejects.toMatchObject({ status: 413 });
  });
  it('handles malformed JSON', async () => {
    await expect(
      readJson(
        new Request('http://localhost', { method: 'POST', body: '{bad' }),
        2048,
      ),
    ).rejects.toBeInstanceOf(RequestBodyError);
  });
});
describe('rate limits', () => {
  it('limits attempts and recovers after the window expires', () => {
    const limit = createRateLimiter(2, 10000);
    expect(limit('visitor', 0).allowed).toBe(true);
    expect(limit('visitor', 1).allowed).toBe(true);
    expect(limit('visitor', 2)).toEqual({ allowed: false, retryAfter: 10 });
    expect(limit('visitor', 10000).allowed).toBe(true);
  });
  it('bounds memory without admitting unlimited new keys', () => {
    const limit = createRateLimiter(2, 10000, 1);
    expect(limit('first', 0).allowed).toBe(true);
    expect(limit('second', 1).allowed).toBe(false);
    expect(limit('second', 10000).allowed).toBe(true);
  });
});
describe('content navigation', () => {
  it('links every service example to an existing illustrative workflow', () => {
    for (const detail of SERVICE_DETAILS)
      expect(
        SOLUTION_EXAMPLES.some((example) => example.slug === detail.example),
      ).toBe(true);
  });
  it('links each buying guide to an available detailed service', () => {
    for (const guide of GUIDES)
      expect(
        SERVICE_DETAILS.some((service) => service.id === guide.relatedService),
      ).toBe(true);
  });
});
