import { afterEach, describe, expect, it, vi } from 'vitest';
import { deliverLead } from '@/server/lead-delivery';
import { leadSchema } from '@/features/contact/lead-schema';

const lead = leadSchema.parse({
  services: ['website'],
  industry: '',
  size: '',
  timing: '',
  problem: '',
  budget: '',
  name: 'Jane',
  company: 'Company',
  email: 'jane@example.com',
  phone: '',
  contact: 'Email',
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe('provider delivery', () => {
  it('sends the reference and server-only authentication, excluding the honeypot', async () => {
    vi.stubEnv('LEAD_WEBHOOK_URL', 'https://receiver.example/leads');
    vi.stubEnv('LEAD_WEBHOOK_TOKEN', 'test-token');
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 202 }));
    vi.stubGlobal('fetch', fetchMock);
    await deliverLead(lead, 'ART-TEST');
    const [url, options] = fetchMock.mock.calls[0]!;
    expect(url.href).toBe('https://receiver.example/leads');
    expect(options.headers.Authorization).toBe('Bearer test-token');
    expect(JSON.parse(options.body)).toMatchObject({
      reference: 'ART-TEST',
      name: 'Jane',
      suggested: 'Fixed price',
    });
    expect(JSON.parse(options.body)).not.toHaveProperty('website');
  });
  it('rejects a failed upstream delivery', async () => {
    vi.stubEnv('LEAD_WEBHOOK_URL', 'https://receiver.example/leads');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 500 })),
    );
    await expect(deliverLead(lead, 'ART-TEST')).rejects.toThrow('500');
  });
  it('requires HTTPS in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('LEAD_WEBHOOK_URL', 'http://receiver.example/leads');
    await expect(deliverLead(lead, 'ART-TEST')).rejects.toThrow('HTTPS');
  });
});
