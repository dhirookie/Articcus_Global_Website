import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { CopyButton } from '@/components/ui/copy-button';
import { ContactExperience } from '@/features/contact/contact-experience';

export const metadata = pageMetadata(
  'Contact · Articcus',
  'Contact Articcus in Colombo: hello@articcus.com, +94 77 570 1404, or send a project brief online.',
  '/contact',
);

export default function ContactPage() {
  return (
    <>
      <main id="main">
        <section className="phero" aria-labelledby="page-title">
          <div className="wrap phero-inner">
            <div className="phero-copy">
              <p className="crumbs">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>Contact</span>
              </p>
              <p className="eyebrow">Contact</p>
              <h1 className="h1 sm" id="page-title">
                Tell us what&apos;s slowing you down
              </h1>
              <p className="lead">
                Book a free 30-minute call. We reply within one working day.
              </p>
              <div className="phero-ctas">
                <a className="btn btn-primary btn-lg" href="#start">
                  Build your project brief
                  <svg className="ic arrow" aria-hidden="true">
                    <use href="#i-arrow"></use>
                  </svg>
                </a>
              </div>
            </div>
            <div className="contact-card">
              <h2>Talk to us</h2>
              <div className="c-row">
                <span className="c-ic">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-mail"></use>
                  </svg>
                </span>
                <div>
                  <small>Email</small>
                  <a href="mailto:hello@articcus.com">hello@articcus.com</a>
                </div>
                <CopyButton
                  text="hello@articcus.com"
                  className="copy-btn"
                  aria-label="Copy email address"
                >
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-copy"></use>
                  </svg>
                </CopyButton>
              </div>
              <div className="c-row">
                <span className="c-ic">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-call"></use>
                  </svg>
                </span>
                <div>
                  <small>Phone</small>
                  <a href="tel:+94775701404">+94 77 570 1404</a>
                </div>
                <CopyButton
                  text="+94 77 570 1404"
                  className="copy-btn"
                  aria-label="Copy phone number"
                >
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-copy"></use>
                  </svg>
                </CopyButton>
              </div>
              <div className="c-row">
                <span className="c-ic">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-pin"></use>
                  </svg>
                </span>
                <div>
                  <small>Office</small>
                  <span className="c-val">
                    No.14, Sir Baron Jayathilake Mawatha, Colombo-00100
                  </span>
                </div>
                <CopyButton
                  text="No.14, Sir Baron Jayathilake Mawatha, Colombo-00100"
                  className="copy-btn"
                  aria-label="Copy office address"
                >
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-copy"></use>
                  </svg>
                </CopyButton>
              </div>
              <a
                className="link-arrow map-link"
                href="https://www.google.com/maps/search/?api=1&query=No.14%2C+Sir+Baron+Jayathilake+Mawatha%2C+Colombo+00100%2C+Sri+Lanka"
                target="_blank"
                rel="noopener"
              >
                Open in Google Maps
                <svg className="ic" aria-hidden="true">
                  <use href="#i-ext"></use>
                </svg>
              </a>
            </div>
          </div>
        </section>
        <section className="sec" id="start" aria-labelledby="start-title">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Start a project</p>
              <h2 className="h2" id="start-title" tabIndex={-1}>
                Build your project brief
              </h2>
              <p className="lead">
                Pick what you need and describe the problem.
              </p>
            </div>
            <ContactExperience />
          </div>
        </section>
      </main>
    </>
  );
}
