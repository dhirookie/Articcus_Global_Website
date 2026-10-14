import Link from 'next/link';

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
                Book a free 30-minute discovery call. You get a written summary
                within 24 hours.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-sky btn-lg" href="/contact#start">
                Start a project
                <svg className="ic arrow" aria-hidden="true">
                  <use href="#i-arrow"></use>
                </svg>
              </Link>
              <a className="btn btn-line-light btn-lg" href="tel:+94775701404">
                Call +94 77 570 1404
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
