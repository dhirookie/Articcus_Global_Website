import { createHash } from 'node:crypto';

export function createRateLimiter(
  limit: number,
  windowMs: number,
  capacity = 5000,
) {
  const buckets = new Map<string, { count: number; until: number }>();
  return (
    key: string,
    now = Date.now(),
  ): { allowed: boolean; retryAfter: number } => {
    for (const [id, bucket] of buckets)
      if (bucket.until <= now) buckets.delete(id);
    const bucket = buckets.get(key);
    if (!bucket) {
      if (buckets.size >= capacity)
        return { allowed: false, retryAfter: Math.ceil(windowMs / 1000) };
      buckets.set(key, { count: 1, until: now + windowMs });
      return { allowed: true, retryAfter: 0 };
    }
    if (bucket.count >= limit)
      return {
        allowed: false,
        retryAfter: Math.ceil((bucket.until - now) / 1000),
      };
    bucket.count += 1;
    return { allowed: true, retryAfter: 0 };
  };
}

const visitors = createRateLimiter(10, 10 * 60 * 1000);
const fallback = createRateLimiter(60, 60 * 1000, 1);

/** Configure a header that your trusted reverse proxy strips and sets itself. */
export function limitLead(request: Request) {
  const header = process.env.LEAD_CLIENT_IP_HEADER;
  const address = header
    ? request.headers.get(header)?.split(',')[0]?.trim()
    : null;
  if (!address) return fallback('shared');
  return visitors(
    createHash('sha256').update(address.slice(0, 200)).digest('hex'),
  );
}
