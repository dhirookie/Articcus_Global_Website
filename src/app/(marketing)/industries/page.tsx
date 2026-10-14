import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { css } from '@/lib/styles';
import { Cta } from '@/components/layout/cta';
import { IndustryGrid } from '@/features/industries/industry-grid';

export const metadata = pageMetadata(
  'Industries · Articcus',
  'How Articcus helps retail, manufacturing, hospitality, healthcare, education, logistics, professional services, real estate, finance and startups.',
  '/industries',
);

export default function IndustriesPage() {
  return (
    <>
      <main id="main">
        <section className="phero" aria-labelledby="page-title">
          <div className="wrap phero-inner">
            <div className="phero-copy">
              <p className="crumbs">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>Industries</span>
              </p>
              <p className="eyebrow">Industries</p>
              <h1 className="h1 sm" id="page-title">
                Every industry has its own bottleneck
              </h1>
              <p className="lead">Where we usually start in each one.</p>
            </div>
            <div className="phero-art" aria-hidden="true">
              <svg className="arrows" viewBox="0 0 344 339">
                <use href="#arrows"></use>
              </svg>
              <span
                className="ft c1"
                style={css({ left: '0', top: '10px', '--r': '-8deg' })}
                aria-hidden="true"
              >
                <svg className="ic" aria-hidden="true">
                  <use href="#i-cart"></use>
                </svg>
              </span>
              <span
                className="ft c6"
                style={css({
                  left: '40px',
                  bottom: '6px',
                  '--r': '6deg',
                  '--dl': '-2s',
                })}
                aria-hidden="true"
              >
                <svg className="ic" aria-hidden="true">
                  <use href="#i-truck"></use>
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
                  <use href="#i-medical"></use>
                </svg>
              </span>
            </div>
          </div>
        </section>
        <section className="sec" aria-label="Industries we work with">
          <div className="wrap">
            <IndustryGrid />
          </div>
        </section>
        <section className="sec tight-top" aria-labelledby="fit-title">
          <div className="wrap">
            <div className="fit reveal">
              <div className="split-copy">
                <p className="eyebrow">Who we work best with</p>
                <h2 className="h2" id="fit-title">
                  We are a strong fit if this sounds like you
                </h2>
                <p className="lead">
                  If most of these are true, we will work well together.
                </p>
                <div>
                  <Link className="btn btn-primary" href="/contact#start">
                    Tell us about your business
                    <svg className="ic arrow" aria-hidden="true">
                      <use href="#i-arrow"></use>
                    </svg>
                  </Link>
                </div>
              </div>
              <ul className="checks">
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  Two or more years in business, or a funded startup
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  A team of 10 to 200 people
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  A manual process that is costing you money
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  The decision maker can join the first call
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  You want a long-term partner, not a one-off job
                </li>
              </ul>
            </div>
          </div>
        </section>
        <Cta />
      </main>
    </>
  );
}
