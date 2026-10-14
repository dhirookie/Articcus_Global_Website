import { z } from 'zod';
import type { Lead } from './lead-schema';

const receiptSchema = z.object({ reference: z.string().min(1).max(80) });
const errorSchema = z.object({ message: z.string().max(500) });

export async function submitLead(
  lead: Lead,
  key: string,
  signal: AbortSignal,
): Promise<string> {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Idempotency-Key': key },
    body: JSON.stringify(lead),
    signal,
  });
  const result: unknown = await response.json();
  if (!response.ok) {
    const error = errorSchema.safeParse(result);
    throw new Error(
      error.success
        ? error.data.message
        : 'We could not send your enquiry. Please try again or email hello@articcus.com.',
    );
  }
  const receipt = receiptSchema.safeParse(result);
  if (!receipt.success)
    throw new Error(
      'We could not confirm receipt. Please contact hello@articcus.com before sending again.',
    );
  return receipt.data.reference;
}
