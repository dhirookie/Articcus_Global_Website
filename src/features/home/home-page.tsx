import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { HeroContent } from '@/features/home/hero-content';
import { ServicePaths } from '@/features/home/service-paths';
import { SolutionCards } from '@/features/solutions/solution-cards';
import { Personas } from '@/features/home/personas';
import { BriefAction } from '@/features/brief/brief-action';
import { Cta } from '@/components/layout/cta';
import { Icon } from '@/components/ui/icon';
import { getService } from '@/data/catalogue';

export const metadata = pageMetadata(
  'Articcus · Websites, business software and automation',
  'A Colombo-based technology partner for growing businesses. Build clearer websites, connected business systems and practical automations, with an agreed scope and ongoing support.',
  '/',
);

export default function HomePage() {
  return (
    <main id="main">
      <HeroContent />
      <section className="sec" aria-labelledby="paths-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Choose a starting point</p>
            <h2 className="h2" id="paths-title">
              What needs to work better?
            </h2>
            <p className="lead">
              Start with the problem your customers or team face. We can help
              define a manageable first project.
            </p>
          </div>
          <ServicePaths />
        </div>
      </section>
      <section className="sec tight-top" aria-labelledby="examples-title">
        <div className="wrap">
          <div className="sec-head-row">
            <div className="sec-head">
              <p className="eyebrow">Solution examples</p>
              <h2 className="h2" id="examples-title">
                See what a practical solution could look like
              </h2>
              <p className="lead">
                Illustrative workflows showing the approach, dependencies and
                measures to discuss. These are not client case studies.
              </p>
            </div>
            <Link className="btn btn-outline" href="/solutions">
              Explore all examples
            </Link>
          </div>
          <SolutionCards />
        </div>
      </section>
      <section className="on-deep who" aria-labelledby="who-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Who we work with</p>
            <h2 className="h2" id="who-title">
              A technology partner for growing businesses
            </h2>
            <p className="lead">
              Our core focus is established teams with 10–200 people that need
              better ways to handle enquiries, orders, reporting and routine
              work. Start with a defined project, then choose the support you
              need.
            </p>
          </div>
          <div className="guide-links">
            <Link className="btn btn-sky" href="/about">
              About Articcus
            </Link>
            <Link className="btn btn-line-light" href="/how-we-work">
              Understand the delivery process
            </Link>
            <Link className="btn btn-line-light" href="/services#devs">
              Development support for overseas teams
            </Link>
          </div>
        </div>
      </section>
      <section className="sec" id="people" aria-labelledby="people-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Your role, your priorities</p>
            <h2 className="h2" id="people-title">
              Find a starting point for your team
            </h2>
          </div>
          <Personas />
        </div>
      </section>
      <section className="sec tight-top" aria-labelledby="starters-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">A manageable first step</p>
            <h2 className="h2" id="starters-title">
              Start with one useful improvement
            </h2>
            <p className="lead">
              Indicative timelines help you plan. The proposal confirms scope,
              access requirements and review dates.
            </p>
          </div>
          <div className="content-grid">
            {(['audit', 'website', 'gbp'] as const).map((id) => {
              const service = getService(id);
              return (
                <article className={`content-card ${service.c}`} key={id}>
                  <span className="mini-ic">
                    <Icon name={service.icon} />
                  </span>
                  <span className="chip">{service.time}</span>
                  <h3 className="h3">{service.name}</h3>
                  <p>{service.what}</p>
                  <BriefAction
                    services={[id]}
                    mode="toggle"
                    className="btn btn-outline btn-add"
                  >
                    <span className="when-off">Add to my brief</span>
                    <span className="when-on">Added to your brief</span>
                  </BriefAction>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="sec tight-top" aria-labelledby="guides-title">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Before you decide</p>
            <h2 className="h2" id="guides-title">
              Know which questions to ask
            </h2>
          </div>
          <div className="guide-links">
            <Link
              className="btn btn-outline"
              href="/guides/when-to-replace-spreadsheets"
            >
              When to replace a spreadsheet
            </Link>
            <Link
              className="btn btn-outline"
              href="/guides/custom-software-or-existing-platform"
            >
              Custom build or existing platform?
            </Link>
            <Link
              className="btn btn-outline"
              href="/guides/what-affects-project-cost"
            >
              What affects project cost?
            </Link>
          </div>
        </div>
      </section>
      <Cta />
    </main>
  );
}
