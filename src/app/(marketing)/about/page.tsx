import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/content/page-hero';
import { Cta } from '@/components/layout/cta';

export const metadata = pageMetadata(
  'About Articcus · A practical technology partner',
  'Meet Articcus: a Colombo-based technology partner for business websites, custom systems, automation and ongoing support.',
  '/about',
);
export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About Articcus"
        title="Technology that fits the work your business actually does"
        description="Based in Colombo, Articcus designs, builds and supports websites, business software, automations and AI tools. We work with growing businesses and support overseas teams on scoped builds and dedicated development."
      />
      <section className="sec">
        <div className="wrap reading-layout">
          <article className="reading-copy">
            <h2 className="h3">Start with the process</h2>
            <p>
              A new tool is useful when it solves a clear problem. We start by
              understanding how work moves through your business, where it slows
              down, and what information your team needs to make decisions.
            </p>
            <h2 className="h3">Choose a manageable first step</h2>
            <p>
              That might be a better website, one connected workflow, or a
              prototype for a larger system. The scope should be small enough to
              explain, review and measure before making a wider commitment.
            </p>
            <h2 className="h3">Make delivery understandable</h2>
            <p>
              The proposal sets out the deliverables, dependencies, price and
              milestones. Reviews let your team see progress and test the agreed
              journeys. Changes are discussed and approved before additional
              work begins.
            </p>
            <h2 className="h3">Plan for life after launch</h2>
            <p>
              Handover, staff guidance, access and support arrangements belong
              in the project plan. One-off delivery and ongoing maintenance are
              separate choices, so you can understand what you are paying for.
            </p>
            <Link className="link-arrow" href="/how-we-work">
              See the delivery process
            </Link>
          </article>
          <aside className="reading-aside">
            <h2 className="h3">Talk to Articcus</h2>
            <p>
              No.14, Sir Baron Jayathilake Mawatha, Colombo-00100, Sri Lanka
            </p>
            <a href="mailto:hello@articcus.com">hello@articcus.com</a>
            <a href="tel:+94775701404">+94 77 570 1404</a>
            <Link href="/contact#enquiry" className="btn btn-primary">
              Request a discovery call
            </Link>
          </aside>
        </div>
      </section>
      <Cta />
    </main>
  );
}
