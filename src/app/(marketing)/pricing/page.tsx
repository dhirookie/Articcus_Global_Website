import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { css } from '@/lib/styles';
import { Cta } from '@/components/layout/cta';
import { QuoteExamples } from '@/components/content/quote-examples';

export const metadata = pageMetadata(
  'Pricing · Articcus',
  'Fixed price, paid discovery, time and materials, monthly retainers and dedicated teams, with 40/30/30 milestone payments.',
  '/pricing',
);

export default function PricingPage() {
  return (
    <>
      <main id="main">
        <section className="phero" aria-labelledby="page-title">
          <div className="wrap phero-inner">
            <div className="phero-copy">
              <p className="crumbs">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>Pricing</span>
              </p>
              <p className="eyebrow">Pricing</p>
              <h1 className="h1 sm" id="page-title">
                Pay in the way that fits the work
              </h1>
              <p className="lead">
                Fixed price for clear scopes, paid discovery for big ideas,
                monthly for ongoing work.
              </p>
              <div className="phero-ctas">
                <Link className="btn btn-primary btn-lg" href="/contact#start">
                  Get a costed estimate
                  <svg className="ic arrow" aria-hidden="true">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="phero-art" aria-hidden="true">
              <svg className="arrows" viewBox="0 0 344 339">
                <use href="#arrows"></use>
              </svg>
              <span
                className="ft c6"
                style={css({ left: '0', top: '10px', '--r': '-8deg' })}
                aria-hidden="true"
              >
                <svg className="ic" aria-hidden="true">
                  <use href="#i-target"></use>
                </svg>
              </span>
              <span
                className="ft c1"
                style={css({
                  left: '40px',
                  bottom: '6px',
                  '--r': '6deg',
                  '--dl': '-2s',
                })}
                aria-hidden="true"
              >
                <svg className="ic" aria-hidden="true">
                  <use href="#i-compass"></use>
                </svg>
              </span>
              <span
                className="ft c5"
                style={css({
                  right: '0',
                  bottom: '30px',
                  '--r': '-5deg',
                  '--dl': '-4s',
                })}
                aria-hidden="true"
              >
                <svg className="ic" aria-hidden="true">
                  <use href="#i-repeat"></use>
                </svg>
              </span>
            </div>
          </div>
        </section>
        <section className="sec" aria-labelledby="models-title">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Engagement models</p>
              <h2 className="h2" id="models-title">
                Five ways to work with us
              </h2>
            </div>
            <div className="models">
              <article className="model reveal" style={css({ '--d': '0' })}>
                <span className="model-ic c6">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-target"></use>
                  </svg>
                </span>
                <h3>Fixed price</h3>
                <dl>
                  <div>
                    <dt>Best when</dt>
                    <dd>Clear, written scope.</dd>
                  </div>
                  <div>
                    <dt>How it&apos;s billed</dt>
                    <dd>One price, three milestone payments.</dd>
                  </div>
                  <div>
                    <dt>Typical work</dt>
                    <dd>Websites, online stores, defined apps</dd>
                  </div>
                </dl>
              </article>
              <article className="model reveal" style={css({ '--d': '1' })}>
                <span className="model-ic c1">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-compass"></use>
                  </svg>
                </span>
                <h3>Paid discovery</h3>
                <dl>
                  <div>
                    <dt>Best when</dt>
                    <dd>Big or unclear ideas.</dd>
                  </div>
                  <div>
                    <dt>How it&apos;s billed</dt>
                    <dd>A scoping fee, deducted if you go ahead.</dd>
                  </div>
                  <div>
                    <dt>Typical work</dt>
                    <dd>Platforms, AI, complex ERP</dd>
                  </div>
                </dl>
              </article>
              <article className="model reveal" style={css({ '--d': '2' })}>
                <span className="model-ic c3">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-hourglass"></use>
                  </svg>
                </span>
                <h3>Time and materials</h3>
                <dl>
                  <div>
                    <dt>Best when</dt>
                    <dd>The scope will change.</dd>
                  </div>
                  <div>
                    <dt>How it&apos;s billed</dt>
                    <dd>Hours worked, capped monthly.</dd>
                  </div>
                  <div>
                    <dt>Typical work</dt>
                    <dd>AI experiments, ongoing features</dd>
                  </div>
                </dl>
              </article>
              <article className="model reveal" style={css({ '--d': '3' })}>
                <span className="model-ic c5">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-repeat"></use>
                  </svg>
                </span>
                <h3>Monthly retainer</h3>
                <dl>
                  <div>
                    <dt>Best when</dt>
                    <dd>Ongoing support.</dd>
                  </div>
                  <div>
                    <dt>How it&apos;s billed</dt>
                    <dd>Monthly or yearly, in advance.</dd>
                  </div>
                  <div>
                    <dt>Typical work</dt>
                    <dd>Maintenance, hosting, IT, security</dd>
                  </div>
                </dl>
              </article>
              <article className="model reveal" style={css({ '--d': '4' })}>
                <span className="model-ic c4">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-users"></use>
                  </svg>
                </span>
                <h3>Dedicated team</h3>
                <dl>
                  <div>
                    <dt>Best when</dt>
                    <dd>You need full-time people.</dd>
                  </div>
                  <div>
                    <dt>How it&apos;s billed</dt>
                    <dd>Monthly per person, three-month minimum.</dd>
                  </div>
                  <div>
                    <dt>Typical work</dt>
                    <dd>Developers, QA, designers</dd>
                  </div>
                </dl>
              </article>
            </div>
            <div className="pay reveal">
              <div>
                <h3>How project payments work</h3>
                <p>
                  A 40% advance reserves the agreed work and starts the project.
                  The next 30% is due at the agreed mid-project milestone, and
                  the final 30% on delivery. Sri Lankan clients are quoted in
                  LKR, overseas clients in USD.
                </p>
              </div>
              <div
                className="paybar"
                role="img"
                aria-label="Project payments: 40% to start, 30% at the mid-project milestone, 30% on delivery"
              >
                <div className="pay-seg c6" style={css({ flex: '40' })}>
                  <b>40%</b>
                  <span>To start</span>
                </div>
                <div className="pay-seg c1" style={css({ flex: '30' })}>
                  <b>30%</b>
                  <span>Mid-project milestone</span>
                </div>
                <div className="pay-seg c5" style={css({ flex: '30' })}>
                  <b>30%</b>
                  <span>On delivery</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <QuoteExamples />
        <section
          className="sec tight-top"
          id="agreement"
          aria-labelledby="inc-title"
        >
          <div className="wrap">
            <div className="fit reveal">
              <div className="split-copy">
                <p className="eyebrow">In every agreement</p>
                <h2 className="h2" id="inc-title">
                  What every project includes
                </h2>
                <p className="lead">
                  Written into every agreement before work starts.
                </p>
              </div>
              <ul className="checks">
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  A written scope: what is in and what is out
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  A timeline with milestones
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  Written change requests for anything new
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  Full ownership once fully paid
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  30 days of free defect fixes after launch
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  Confidentiality and care for your data
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section
          className="sec"
          id="faq"
          style={css({ paddingTop: '0' })}
          aria-labelledby="faq-title"
        >
          <div className="wrap faq">
            <div className="faq-side reveal">
              <p className="eyebrow">FAQ</p>
              <h2 className="h2" id="faq-title">
                Questions we get asked
              </h2>
              <p className="lead">
                Straight answers about payments and ownership.
              </p>
              <div className="faq-card">
                <strong>Still have a question?</strong>
                <span>Ask it on a free 30-minute call.</span>
                <div>
                  <Link className="btn btn-primary" href="/contact#start">
                    Book a call
                  </Link>
                </div>
              </div>
            </div>
            <div className="faq-list">
              <details>
                <summary>
                  Why do you ask for an advance before starting?
                  <span className="pm">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-plus"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq-a">
                  It protects both sides: 40% to start, 30% mid-project and 30%
                  on delivery.
                </p>
              </details>
              <details>
                <summary>
                  Can you build a free prototype or demo first?
                  <span className="pm">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-plus"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq-a">
                  No, but we&apos;ll show similar work. A paid discovery is
                  deducted from the build if you go ahead.
                </p>
              </details>
              <details>
                <summary>
                  Who owns the code and designs?
                  <span className="pm">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-plus"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq-a">You do, once the project is fully paid.</p>
              </details>
              <details>
                <summary>
                  What happens after launch?
                  <span className="pm">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-plus"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq-a">
                  Free defect fixes for 30 days, then an optional maintenance
                  plan.
                </p>
              </details>
              <details>
                <summary>
                  Another company quoted less. Why should we pay more?
                  <span className="pm">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-plus"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq-a">
                  Compare support, ownership, testing and warranty line by line.
                  Cheaper quotes often leave these out.
                </p>
              </details>
              <details>
                <summary>
                  Can you work alongside our in-house IT person?
                  <span className="pm">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-plus"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq-a">
                  Yes. We take on the bigger builds while your team runs
                  day-to-day IT.
                </p>
              </details>
              <details>
                <summary>
                  Can you deliver faster?
                  <span className="pm">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-plus"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq-a">
                  Often, with a smaller first release that meets your date.
                </p>
              </details>
              <details>
                <summary>
                  Do you work with overseas clients?
                  <span className="pm">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-plus"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq-a">
                  Yes. Fixed-price builds and dedicated developers, quoted in
                  USD.
                </p>
              </details>
              <details>
                <summary>
                  What if you don&apos;t offer what we need?
                  <span className="pm">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-plus"></use>
                    </svg>
                  </span>
                </summary>
                <p className="faq-a">
                  We&apos;ll say so and refer you to a trusted partner.
                </p>
              </details>
            </div>
          </div>
        </section>
        <Cta />
      </main>
    </>
  );
}
