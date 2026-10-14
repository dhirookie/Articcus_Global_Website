import Link from 'next/link';
import { site } from '@/config/site';

export function Cta() {
  return (
    <>
      <section className="cta" aria-labelledby="cta-title">
        <div className="wrap">
          <div className="cta-card reveal">
            <svg className="arrows" viewBox="0 0 344 339" aria-hidden="true">
              <use href="#arrows"></use>
            </svg>
            <div>
              <h2 className="h2" id="cta-title">
                Tell us what&apos;s slowing the business down
              </h2>
              <p>
                Start with a free 30-minute discovery conversation. Tell us
                about one problem and we can discuss a practical next step.
              </p>
            </div>
            <div className="cta-actions">
              <Link
                className="btn btn-sky btn-lg"
                href={site.discoveryHref}
                data-discovery
              >
                Request a discovery call
                <svg className="ic arrow" aria-hidden="true">
                  <use href="#i-arrow"></use>
                </svg>
              </Link>
              <Link className="btn btn-line-light btn-lg" href="/contact#start">
                Build a project brief
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
