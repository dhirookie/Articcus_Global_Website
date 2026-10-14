export function StructuredData({ data }: { data: Record<string, unknown> }) {
  const content = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
