import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { leadSchema } from '@/features/contact/lead-schema';
import { briefText } from '@/features/contact/brief-text';
import { POST } from '@/app/api/leads/route';
import { deliverLead } from '@/server/lead-delivery';

vi.mock('@/server/lead-delivery', () => ({ deliverLead: vi.fn() }));

const valid = {
  services: ['website'],
  industry: 'retail',
  size: '',
  timing: '',
  problem: '',
  budget: '',
  name: 'Jane Doe',
  company: 'Example Ltd',
  email: 'jane@example.com',
  phone: '',
  contact: 'Email',
  website: '',
};

describe('lead validation', () => {
  it('accepts a service selection with valid contact details', () =>
    expect(leadSchema.safeParse(valid).success).toBe(true));
  it('accepts a described problem instead of a selected service', () =>
    expect(
      leadSchema.safeParse({
        ...valid,
        services: [],
        problem: 'Orders are entered twice.',
      }).success,
    ).toBe(true));
  it.each([
    { services: [], problem: 'short' },
    { email: 'invalid' },
    { name: '' },
    { company: '' },
    { services: ['fake'] },
    { industry: 'fake' },
    { contact: 'WhatsApp', phone: '' },
    { phone: '123' },
    { website: 'spam.example' },
    { problem: 'x'.repeat(5001) },
    { size: 'invented' },
  ])('rejects invalid input: %j', (patch) =>
    expect(leadSchema.safeParse({ ...valid, ...patch }).success).toBe(false),
  );
  it('deduplicates services and trims details', () => {
    const result = leadSchema.parse({
      ...valid,
      services: ['website', 'website'],
      name: '  Jane  ',
    });
    expect(result.services).toEqual(['website']);
    expect(result.name).toBe('Jane');
  });
  it('creates an exportable brief containing the accepted reference', () => {
    const text = briefText(leadSchema.parse(valid), 'ART-EXAMPLE');
    expect(text).toContain('Reference: ART-EXAMPLE');
    expect(text).toContain('Business website');
    expect(text).toContain('Retail and distribution');
  });
});

function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/leads', {
    method: 'POST',
    headers: {
      origin: 'http://localhost',
      'content-type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

describe('lead endpoint', () => {
  beforeEach(() => {
    vi.stubEnv('LEAD_WEBHOOK_URL', 'https://receiver.example/leads');
    vi.mocked(deliverLead).mockResolvedValue(undefined);
  });
  afterEach(() => vi.unstubAllEnvs());
  it('returns a reference only after the provider accepts the lead', async () => {
    const response = await POST(request());
    expect(response.status).toBe(201);
    expect((await response.json()).reference).toMatch(/^ART-/);
    expect(deliverLead).toHaveBeenCalledOnce();
  });
  it('reuses the same provider reference when the browser retries a submission', async () => {
    const key = '6dcc8ac7-3e32-4fba-98f4-d4623dccb4c8';
    const first = await POST(request(valid, { 'x-idempotency-key': key }));
    const second = await POST(request(valid, { 'x-idempotency-key': key }));
    expect((await first.json()).reference).toBe(
      (await second.json()).reference,
    );
  });
  it('does not simulate success when delivery is unconfigured', async () => {
    vi.stubEnv('LEAD_WEBHOOK_URL', '');
    expect((await POST(request())).status).toBe(503);
    expect(deliverLead).not.toHaveBeenCalled();
  });
  it('preserves a failure when the upstream provider fails', async () => {
    vi.mocked(deliverLead).mockRejectedValue(new Error('upstream failure'));
    expect((await POST(request())).status).toBe(502);
  });
  it('blocks cross-origin submissions', async () =>
    expect(
      (await POST(request(valid, { origin: 'https://other.example' }))).status,
    ).toBe(403));
  it('rejects invalid contact details before sending to the provider', async () => {
    expect((await POST(request({ ...valid, email: 'bad' }))).status).toBe(400);
    expect(deliverLead).not.toHaveBeenCalled();
  });
  it('bounds bodies without relying on Content-Length', async () =>
    expect(
      (await POST(request({ ...valid, problem: 'x'.repeat(17000) }))).status,
    ).toBe(413));
  it('rejects non-JSON requests', async () =>
    expect(
      (await POST(request(valid, { 'content-type': 'text/plain' }))).status,
    ).toBe(415));
  it('handles malformed JSON', async () => {
    const incoming = new Request('http://localhost/api/leads', {
      method: 'POST',
      headers: {
        origin: 'http://localhost',
        'content-type': 'application/json',
      },
      body: '{broken',
    });
    expect((await POST(incoming)).status).toBe(400);
  });
});
