import Link from 'next/link';

export function DeliveryExpectations() {
  return (
    <section className="sec tight-top" aria-labelledby="expectations-title">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Clear agreements</p>
          <h2 className="h2" id="expectations-title">
            Know how reviews, changes and support work
          </h2>
        </div>
        <div className="content-grid">
          <article className="content-card">
            <h3 className="h3">Acceptance criteria</h3>
            <p>
              The proposal describes what each milestone must do. Your team
              reviews realistic journeys and records defects against those
              criteria before sign-off.
            </p>
          </article>
          <article className="content-card">
            <h3 className="h3">Changes to scope</h3>
            <p>
              Additional requests are written down, assessed for cost and
              timing, and approved before work starts. A new feature and a
              defect against the agreed scope are different requests.
            </p>
          </article>
          <article className="content-card">
            <h3 className="h3">After launch</h3>
            <p>
              The agreement sets the defect warranty, access handover and staff
              guidance. Ongoing updates, monitoring and extra changes need an
              agreed support arrangement.
            </p>
            <Link href="/pricing" className="link-arrow">
              Understand delivery and running costs
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
