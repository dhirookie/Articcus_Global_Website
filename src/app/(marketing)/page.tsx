import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { css } from '@/lib/styles';
import { BriefAction } from '@/features/brief/brief-action';
import { Cta } from '@/components/layout/cta';
import { IndustryMarquee } from '@/features/industries/industry-grid';
import { IndustryCarousel } from '@/features/industries/industry-carousel';
import { ServiceOverview } from '@/features/services/service-catalogue';
import { HeroContent } from '@/features/home/hero-content';
import { Personas } from '@/features/home/personas';

export const metadata = pageMetadata(
  'Articcus',
  'Articcus designs, builds and runs websites, apps, automations and AI tools for businesses that have outgrown manual operations.',
  '/',
);

export default function HomePage() {
  return (
    <>
      <main id="main">
        <HeroContent />
        <section className="sec" id="problems" aria-labelledby="pains-title">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Sound familiar?</p>
              <h2 className="h2" id="pains-title">
                We fix the problems that quietly cost you money
              </h2>
              <p className="lead">These are the ones we hear most often.</p>
            </div>
            <div className="pains">
              <article className="pain reveal" style={css({ '--d': '0' })}>
                <span className="chip c6">Custom web app</span>
                <blockquote>
                  “We run the business on Excel and WhatsApp.”
                </blockquote>
                <p>One system for orders, bookings and approvals.</p>
                <Link
                  className="link-arrow"
                  href="/services#webapp"
                  data-svc="webapp"
                >
                  How we fix it
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </article>
              <article className="pain reveal" style={css({ '--d': '1' })}>
                <span className="chip c3">Dashboards</span>
                <blockquote>
                  “I get reports late and the numbers never match.”
                </blockquote>
                <p>Live dashboards built from the data you already have.</p>
                <Link
                  className="link-arrow"
                  href="/services#dash"
                  data-svc="dash"
                >
                  How we fix it
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </article>
              <article className="pain reveal" style={css({ '--d': '2' })}>
                <span className="chip c4">Integration</span>
                <blockquote>
                  “We enter the same order in three places.”
                </blockquote>
                <p>Your systems connected, so every order is entered once.</p>
                <Link
                  className="link-arrow"
                  href="/services#integration"
                  data-svc="integration"
                >
                  How we fix it
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </article>
              <article className="pain reveal" style={css({ '--d': '0' })}>
                <span className="chip c5">Google profile and SEO</span>
                <blockquote>“Customers can’t find us online.”</blockquote>
                <p>
                  A fast website and Google listing that bring in enquiries.
                </p>
                <Link
                  className="link-arrow"
                  href="/services#gbp"
                  data-svc="gbp"
                >
                  How we fix it
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </article>
              <article className="pain reveal" style={css({ '--d': '1' })}>
                <span className="chip c2">AI solutions</span>
                <blockquote>
                  “We answer the same questions a hundred times a day.”
                </blockquote>
                <p>An AI assistant that answers routine questions for you.</p>
                <Link className="link-arrow" href="/services#ai" data-svc="ai">
                  How we fix it
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </article>
              <article className="pain reveal" style={css({ '--d': '2' })}>
                <span className="chip c1">Managed IT</span>
                <blockquote>
                  “We only call someone when something breaks.”
                </blockquote>
                <p>
                  Monitoring, backups and a helpdesk for a fixed monthly fee.
                </p>
                <Link className="link-arrow" href="/services#it" data-svc="it">
                  How we fix it
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </article>
            </div>
          </div>
        </section>
        <section className="on-deep who" aria-labelledby="who-title">
          <div className="wrap">
            <div className="sec-head reveal" style={css({ marginBottom: '0' })}>
              <p className="eyebrow">Who we work with</p>
              <h2 className="h2" id="who-title">
                Built for established businesses with 10 to 200 people
              </h2>
              <p className="lead">
                Growing businesses that need a tech team without hiring one. We
                become that team.
              </p>
            </div>
          </div>
          <div className="marq" id="marq">
            <IndustryMarquee />
          </div>
          <div className="wrap">
            <div className="stats">
              <p className="stats-lbl">Our commitments, in numbers</p>
              <div className="reveal" style={css({ '--d': '0' })}>
                <p className="stat-num">
                  24<span className="u">{' h'}</span>
                </p>
                <p className="stat-lbl">
                  for a written summary after every meeting
                </p>
              </div>
              <div className="reveal" style={css({ '--d': '1' })}>
                <p className="stat-num">
                  3–5<span className="u">{' days'}</span>
                </p>
                <p className="stat-lbl">
                  from discovery call to a costed estimate
                </p>
              </div>
              <div className="reveal" style={css({ '--d': '2' })}>
                <p className="stat-num">
                  30<span className="u">{' days'}</span>
                </p>
                <p className="stat-lbl">
                  of free defect fixes after every launch
                </p>
              </div>
              <div className="reveal" style={css({ '--d': '3' })}>
                <p className="stat-num">100%</p>
                <p className="stat-lbl">
                  of the code and designs are yours on full payment
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="sec" aria-labelledby="ov-title">
          <div className="wrap">
            <div className="sec-head-row">
              <div className="sec-head reveal">
                <p className="eyebrow">Services</p>
                <h2 className="h2" id="ov-title">
                  Everything you need, from a first website to a full platform
                </h2>
                <p className="lead">
                  Start small, build what fits, then let us keep it running.
                </p>
              </div>
              <Link className="btn btn-outline" href="/services">
                Explore all services
                <svg className="ic arrow" aria-hidden="true">
                  <use href="#i-arrow"></use>
                </svg>
              </Link>
            </div>
            <ServiceOverview />
          </div>
        </section>
        <section className="sec" id="people" aria-labelledby="people-title">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Who it&apos;s for</p>
              <h2 className="h2" id="people-title">
                Built for the people who run the business
              </h2>
            </div>
            <Personas />
          </div>
        </section>
        <IndustryCarousel />
        <section className="sec starters-sec" aria-labelledby="starters-title">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Start small</p>
              <h2 className="h2" id="starters-title">
                Not ready for a big project? Take the first step
              </h2>
            </div>
            <div className="starters">
              <article
                className="starter reveal c3"
                style={css({ '--d': '0' })}
              >
                <div className="starter-top">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-search"></use>
                  </svg>
                  <span className="chip">1–2 weeks</span>
                </div>
                <div className="starter-body">
                  <h3>Digital health check</h3>
                  <p>A written report on gaps and quick wins.</p>
                  <div className="sd-actions">
                    <BriefAction
                      services={['audit']}
                      mode="toggle"
                      industry=""
                      className="btn btn-outline btn-add"
                    >
                      <span className="when-off">Add to my brief</span>
                      <span className="when-on">Added to your brief</span>
                    </BriefAction>
                  </div>
                </div>
              </article>
              <article
                className="starter reveal c1"
                style={css({ '--d': '1' })}
              >
                <div className="starter-top">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-globe"></use>
                  </svg>
                  <span className="chip">2–4 weeks</span>
                </div>
                <div className="starter-body">
                  <h3>Business website</h3>
                  <p>A fast, mobile-friendly site that brings in enquiries.</p>
                  <div className="sd-actions">
                    <BriefAction
                      services={['website']}
                      mode="toggle"
                      industry=""
                      className="btn btn-outline btn-add"
                    >
                      <span className="when-off">Add to my brief</span>
                      <span className="when-on">Added to your brief</span>
                    </BriefAction>
                  </div>
                </div>
              </article>
              <article
                className="starter reveal c5"
                style={css({ '--d': '2' })}
              >
                <div className="starter-top">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-pin"></use>
                  </svg>
                  <span className="chip">1–2 weeks</span>
                </div>
                <div className="starter-body">
                  <h3>Google Business Profile and SEO</h3>
                  <p>Get found on Google Search and Maps.</p>
                  <div className="sd-actions">
                    <BriefAction
                      services={['gbp']}
                      mode="toggle"
                      industry=""
                      className="btn btn-outline btn-add"
                    >
                      <span className="when-off">Add to my brief</span>
                      <span className="when-on">Added to your brief</span>
                    </BriefAction>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        <Cta />
      </main>
    </>
  );
}
