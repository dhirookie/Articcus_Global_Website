import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  SOLUTION_EXAMPLES,
  getSolutionExample,
} from '@/data/solution-examples';
import { pageMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/content/page-hero';
import { BriefAction } from '@/features/brief/brief-action';
import { getService } from '@/data/catalogue';
import { serviceHref } from '@/data/service-details';

export const dynamicParams = false;
export function generateStaticParams() {
  return SOLUTION_EXAMPLES.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const example = getSolutionExample(slug);
  return example
    ? pageMetadata(
        `${example.title} · Articcus`,
        example.approach,
        `/solutions/${slug}`,
      )
    : {};
}
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const example = getSolutionExample(slug);
  if (!example) notFound();
  return (
    <main id="main">
      <PageHero
        eyebrow="Illustrative example"
        title={example.title}
        description={example.approach}
        action={false}
      />
      <section className="sec">
        <div className="wrap reading-layout">
          <article className="reading-copy">
            <p className="notice">
              A proposed workflow for discussion. This is not a client project,
              testimonial, or measured result.
            </p>
            <h2 className="h3">The problem to address</h2>
            <p>{example.problem}</p>
            <h2 className="h3">A possible workflow</h2>
            <ol className="workflow-list">
              {example.steps.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <h2 className="h3">How to judge whether it helps</h2>
            <p>
              Record the current process first, then agree a target and review
              the same measures after launch.
            </p>
            <ul className="content-list">
              {example.measures.map((measure) => (
                <li key={measure}>{measure}</li>
              ))}
            </ul>
            <h2 className="h3">What needs to be checked first</h2>
            <p>{example.boundaries}</p>
            <BriefAction
              className="btn btn-primary"
              services={example.services}
            >
              Discuss a similar workflow
            </BriefAction>
          </article>
          <aside className="reading-aside">
            <h2 className="h3">Relevant services</h2>
            <ul className="content-list">
              {example.services.map((id) => (
                <li key={id}>
                  <Link href={serviceHref(id)}>{getService(id).name}</Link>
                </li>
              ))}
            </ul>
            <Link className="link-arrow" href="/solutions">
              All solution examples
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
