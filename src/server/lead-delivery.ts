import { industryName } from '@/features/contact/brief-text';
import { suggestModel } from '@/features/brief/suggest-model';
import type { Lead } from '@/features/contact/lead-schema';

/** Provider credentials and delivery URLs remain exclusively on the server. */
export async function deliverLead(
  lead: Lead,
  reference: string,
): Promise<void> {
  const endpoint = process.env.LEAD_WEBHOOK_URL;
  if (!endpoint) throw new Error('Lead delivery is not configured.');
  const url = new URL(endpoint);
  if (url.protocol !== 'https:' && process.env.NODE_ENV === 'production')
    throw new Error('Production lead delivery requires HTTPS.');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Idempotency-Key': reference,
  };
  if (process.env.LEAD_WEBHOOK_TOKEN)
    headers.Authorization = `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}`;
  const details = { ...lead };
  Reflect.deleteProperty(details, 'website');
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      ...details,
      reference,
      suggested: suggestModel(lead.services)?.name || '',
      industryName: industryName(lead.industry),
    }),
    signal: AbortSignal.timeout(10000),
    redirect: 'error',
    cache: 'no-store',
  });
  if (!response.ok)
    throw new Error(`Lead provider returned ${response.status}.`);
}
