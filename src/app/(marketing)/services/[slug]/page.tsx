import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICE_DETAILS, getServiceDetail } from '@/data/service-details';
import { getService } from '@/data/catalogue';
import { pageMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/content/page-hero';
import { BriefAction } from '@/features/brief/brief-action';

export const dynamicParams = false;
export function generateStaticParams() {
  return SERVICE_DETAILS.map(({ id: slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  return detail
    ? pageMetadata(
        `${detail.title} · Articcus`,
        detail.introduction,
        `/services/${slug}`,
      )
    : {};
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) notFound();
  const service = getService(detail.id);
  return (
    <main id="main">
      <PageHero
        eyebrow={service.name}
        title={detail.title}
        description={detail.introduction}
      />
      <section className="sec">
        <div className="wrap reading-layout">
          <article className="reading-copy">
            <h2 className="h3">A good starting point when</h2>
            <p>{detail.fit}</p>
            <h2 className="h3">What an agreed scope can include</h2>
            <p>
              The proposal confirms the exact deliverables before work starts.
            </p>
            <ul className="content-list">
              {detail.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h2 className="h3">What is quoted or checked separately</h2>
            <ul className="content-list">
              {detail.boundaries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h2 className="h3">What we need from your team</h2>
            <ul className="content-list">
              {detail.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h2 className="h3">How you review the result</h2>
            <p>{detail.acceptance}</p>
            <BriefAction className="btn btn-primary" services={[detail.id]}>
              Build a brief for this service
            </BriefAction>
          </article>
          <aside className="reading-aside">
            <h2 className="h3">Planning your project</h2>
            <dl className="sd-meta">
              <div>
                <dt>Typical timeline</dt>
                <dd>{service.time}</dd>
              </div>
              <div>
                <dt>Engagement model</dt>
                <dd>{service.bill}</dd>
              </div>
            </dl>
            <p>
              Timelines are indicative. Scope, access, data quality and review
              availability affect the schedule.
            </p>
            <Link className="link-arrow" href={`/solutions/${detail.example}`}>
              See an illustrative workflow
            </Link>
            <Link className="link-arrow" href="/pricing">
              Understand how pricing works
            </Link>
            <Link className="link-arrow" href="/services">
              Browse all services
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
