import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDES, getGuide } from '@/data/guides';
import { pageMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/content/page-hero';
import { Cta } from '@/components/layout/cta';

export const dynamicParams = false;
export function generateStaticParams() {
  return GUIDES.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  return guide
    ? pageMetadata(
        `${guide.title} · Articcus`,
        guide.description,
        `/guides/${slug}`,
      )
    : {};
}
export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return (
    <main id="main">
      <PageHero
        eyebrow="Project guide"
        title={guide.title}
        description={guide.description}
        action={false}
      />
      <section className="sec">
        <div className="wrap reading-layout">
          <article className="reading-copy">
            {guide.sections.map((section) => (
              <section className="guide-section" key={section.heading}>
                <h2 className="h3">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.checklist && (
                  <ul className="content-list">
                    {section.checklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <p className="fine">
              Prepared by Articcus as general project-planning guidance. Your
              proposal should reflect your own requirements and dependencies.
            </p>
          </article>
          <aside className="reading-aside">
            <h2 className="h3">Planning a project?</h2>
            <p>
              Bring one workflow or a current problem to a discovery
              conversation.
            </p>
            <Link href="/contact#enquiry" className="btn btn-primary">
              Request a discovery call
            </Link>
            <Link
              href={`/services/${guide.relatedService}`}
              className="link-arrow"
            >
              Explore the relevant service
            </Link>
            <Link href="/guides" className="link-arrow">
              All guides
            </Link>
          </aside>
        </div>
      </section>
      <Cta />
    </main>
  );
}
