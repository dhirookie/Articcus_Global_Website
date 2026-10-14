export class RequestBodyError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}
export async function readJson(
  request: Request,
  maximumBytes: number,
): Promise<unknown> {
  if (Number(request.headers.get('content-length') || 0) > maximumBytes)
    throw new RequestBodyError(413, 'Request is too large.');
  const reader = request.body?.getReader();
  if (!reader) throw new RequestBodyError(400, 'A request body is required.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maximumBytes) {
      await reader.cancel();
      throw new RequestBodyError(413, 'Request is too large.');
    }
    chunks.push(value);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new RequestBodyError(400, 'Request is not valid JSON.');
  }
}
