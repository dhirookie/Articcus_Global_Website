import { NextResponse } from 'next/server';
import { analyticsSchema } from '@/features/analytics/events';
import { readJson, RequestBodyError } from '@/server/request-body';
import { createRateLimiter } from '@/server/rate-limit';

export const runtime = 'nodejs';
const limit = createRateLimiter(600, 60000, 1);
export async function POST(request: Request) {
  const endpoint = process.env.ANALYTICS_WEBHOOK_URL;
  if (!endpoint) return new Response(null, { status: 204 });
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return new Response(null, { status: 403 });
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return new Response(null, { status: 415 });
  if (!limit('events').allowed) return new Response(null, { status: 429 });
  try {
    const result = analyticsSchema.safeParse(await readJson(request, 2048));
    if (!result.success) return new Response(null, { status: 400 });
    const url = new URL(endpoint);
    if (url.protocol !== 'https:' && process.env.NODE_ENV === 'production')
      return new Response(null, { status: 503 });
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (process.env.ANALYTICS_WEBHOOK_TOKEN)
      headers.Authorization = `Bearer ${process.env.ANALYTICS_WEBHOOK_TOKEN}`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(result.data),
      redirect: 'error',
      signal: AbortSignal.timeout(3000),
      cache: 'no-store',
    });
    return new Response(null, { status: response.ok ? 204 : 502 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Measurement could not be processed.' },
      { status: error instanceof RequestBodyError ? error.status : 502 },
    );
  }
}
