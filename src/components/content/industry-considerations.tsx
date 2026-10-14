import Link from 'next/link';

const considerations = [
  {
    title: 'Retail and distribution',
    text: 'Start with one order journey: who places it, where stock is checked, who approves exceptions, and how accounting receives the result.',
    href: '/solutions/order-to-invoice',
  },
  {
    title: 'Operations and logistics',
    text: 'Map status updates, delivery exceptions, staff access and the information the office needs. Check connectivity and existing system access before promising live tracking.',
    href: '/services/webapp',
  },
  {
    title: 'Service businesses',
    text: 'Make services easy to understand, capture a useful enquiry, and agree who responds. The website and the response process should work together.',
    href: '/solutions/customer-enquiries',
  },
  {
    title: 'Document-heavy teams',
    text: 'Identify approved sources, access permissions and the questions that need human review before piloting a document assistant.',
    href: '/solutions/document-answers',
  },
];
export function IndustryConsiderations() {
  return (
    <section
      className="sec tight-top"
      aria-labelledby="industry-questions-title"
    >
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Make it specific</p>
          <h2 className="h2" id="industry-questions-title">
            The workflow matters more than the industry label
          </h2>
          <p className="lead">
            These planning questions help make the catalogue relevant to your
            business. Scope and feasibility are checked in discovery.
          </p>
        </div>
        <div className="content-grid industry-considerations">
          {considerations.map((item) => (
            <article className="content-card" key={item.title}>
              <h3 className="h3">{item.title}</h3>
              <p>{item.text}</p>
              <Link href={item.href} className="link-arrow">
                Explore a relevant starting point
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
