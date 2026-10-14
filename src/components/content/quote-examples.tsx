import Link from 'next/link';

export function QuoteExamples() {
  return (
    <section className="sec tight-top" aria-labelledby="quote-title">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Compare the scope</p>
          <h2 className="h2" id="quote-title">
            What goes into a useful estimate
          </h2>
          <p className="lead">
            These are sample scopes for discussion. A written proposal confirms
            the price, deliverables and dependencies for your project.
          </p>
        </div>
        <div className="content-grid">
          <article className="content-card">
            <h3 className="h3">A business website</h3>
            <p>
              Agreed pages, responsive design, approved content, an enquiry form
              and launch checks.
            </p>
            <p>
              <strong>Price depends on:</strong> page count, content
              preparation, translations and integrations.
            </p>
            <p>
              <strong>Recurring costs:</strong> domain, hosting and any agreed
              maintenance.
            </p>
            <Link className="link-arrow" href="/services/website">
              Review website scope
            </Link>
          </article>
          <article className="content-card">
            <h3 className="h3">One automated workflow</h3>
            <p>
              A defined trigger, connections to agreed systems, exception
              handling and operating instructions.
            </p>
            <p>
              <strong>Price depends on:</strong> API access, rules, data quality
              and the number of systems involved.
            </p>
            <p>
              <strong>Recurring costs:</strong> platform subscriptions, API
              usage and monitoring.
            </p>
            <Link className="link-arrow" href="/services/automation">
              Review automation scope
            </Link>
          </article>
          <article className="content-card">
            <h3 className="h3">A custom portal</h3>
            <p>
              Discovery, a reviewed core journey, agreed roles, integrations and
              milestone testing.
            </p>
            <p>
              <strong>Price depends on:</strong> user journeys, permissions,
              migration and integrations.
            </p>
            <p>
              <strong>Recurring costs:</strong> hosting, external services and
              agreed support.
            </p>
            <Link className="link-arrow" href="/services/webapp">
              Review portal scope
            </Link>
          </article>
        </div>
        <div className="notice quote-checklist">
          <strong>Ask for these in writing:</strong> deliverables and
          exclusions, review milestones, third-party costs, payment dates,
          warranty coverage and the process for approving changes.{' '}
          <Link href="/guides/what-affects-project-cost">
            Read the quote comparison guide.
          </Link>
        </div>
      </div>
    </section>
  );
}
