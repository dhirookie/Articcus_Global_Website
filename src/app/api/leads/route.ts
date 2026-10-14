import { NextResponse } from 'next/server';
import { leadSchema } from '@/features/contact/lead-schema';
import { deliverLead } from '@/server/lead-delivery';

export const runtime = 'nodejs';

function failure(message: string, status: number) {
  return NextResponse.json(
    { message },
    { status, headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin)
    return failure('This request is not allowed.', 403);
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return failure('Send a JSON request.', 415);
  if (Number(request.headers.get('content-length') || 0) > 16384)
    return failure('Your brief is too large.', 413);
  const idempotencyKey = request.headers.get('x-idempotency-key');
  if (
    idempotencyKey &&
    !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(
      idempotencyKey,
    )
  )
    return failure('Your submission key is invalid.', 400);
  let payload: unknown;
  try {
    // Bound streaming bodies as well as requests with a Content-Length header.
    const reader = request.body?.getReader();
    if (!reader) return failure('A project brief is required.', 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) {
        await reader.cancel();
        return failure('Your brief is too large.', 413);
      }
      chunks.push(value);
    }
    payload = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
  } catch {
    return failure('Your brief could not be read.', 400);
  }
  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success)
    return failure('Please check your contact details and project brief.', 400);
  if (!process.env.LEAD_WEBHOOK_URL)
    return failure(
      'Online enquiries are temporarily unavailable. Please email hello@articcus.com or call +94 77 570 1404.',
      503,
    );
  const reference = `ART-${(idempotencyKey || crypto.randomUUID()).toUpperCase()}`;
  try {
    await deliverLead(parsed.data, reference);
  } catch {
    return failure(
      'We could not send your brief. Please try again or email hello@articcus.com.',
      502,
    );
  }
  return NextResponse.json(
    { reference },
    { status: 201, headers: { 'Cache-Control': 'no-store' } },
  );
}
