import Link from 'next/link';
import { AnalyticsSettings } from '@/features/analytics/analytics';

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="wrap">
          <div className="f-grid">
            <div className="f-brand">
              <Link href="/" aria-label="Articcus home">
                <svg
                  className="logo"
                  viewBox="0 0 2225 551"
                  role="img"
                  aria-label="Articcus"
                >
                  <use href="#logo"></use>
                </svg>
              </Link>
              <p>
                Websites, apps, automation and AI for businesses that have
                outgrown spreadsheets.
              </p>
              <ul className="f-contact">
                <li>
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-mail"></use>
                  </svg>
                  <a href="mailto:hello@articcus.com">hello@articcus.com</a>
                </li>
                <li>
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-call"></use>
                  </svg>
                  <a href="tel:+94775701404">+94 77 570 1404</a>
                </li>
                <li>
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-pin"></use>
                  </svg>
                  <span>
                    No.14, Sir Baron Jayathilake Mawatha, Colombo-00100
                  </span>
                </li>
              </ul>
            </div>
            <nav className="f-col" aria-labelledby="fc-1">
              <h3 id="fc-1">Services</h3>
              <ul>
                <li>
                  <Link href="/services#website" data-svc="website">
                    Business websites
                  </Link>
                </li>
                <li>
                  <Link href="/services#webapp" data-svc="webapp">
                    Custom web apps
                  </Link>
                </li>
                <li>
                  <Link href="/services#mobile" data-svc="mobile">
                    Mobile apps
                  </Link>
                </li>
                <li>
                  <Link href="/services#automation" data-svc="automation">
                    Automation
                  </Link>
                </li>
                <li>
                  <Link href="/services#ai" data-svc="ai">
                    AI solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services">All services</Link>
                </li>
              </ul>
            </nav>
            <nav className="f-col" aria-labelledby="fc-2">
              <h3 id="fc-2">Industries</h3>
              <ul>
                <li>
                  <Link href="/industries#retail">Retail and distribution</Link>
                </li>
                <li>
                  <Link href="/industries#manufacturing">Manufacturing</Link>
                </li>
                <li>
                  <Link href="/industries#hospitality">Hotels and tourism</Link>
                </li>
                <li>
                  <Link href="/industries#logistics">Logistics</Link>
                </li>
                <li>
                  <Link href="/industries">All industries</Link>
                </li>
              </ul>
            </nav>
            <nav className="f-col" aria-labelledby="fc-3">
              <h3 id="fc-3">Company</h3>
              <ul>
                <li>
                  <Link href="/about">About Articcus</Link>
                </li>
                <li>
                  <Link href="/how-we-work">How we work</Link>
                </li>
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/pricing#faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
            <nav className="f-col" aria-labelledby="fc-4">
              <h3 id="fc-4">Resources</h3>
              <ul>
                <li>
                  <Link href="/privacy">Website privacy</Link>
                </li>
                <li>
                  <Link href="/pricing#agreement">Project agreements</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="/solutions">Solution examples</Link>
                </li>
                <li>
                  <Link href="/guides">Project guides</Link>
                </li>
                {process.env.ANALYTICS_WEBHOOK_URL && (
                  <li>
                    <AnalyticsSettings />
                  </li>
                )}
              </ul>
            </nav>
          </div>
          <div className="f-bottom">
            <p>
              {'© '}
              <span className="year">{new Date().getFullYear()}</span>
              {' Articcus. All rights reserved.'}
            </p>
            <div className="socials">
              <a
                href="https://www.linkedin.com/company/articcus-global"
                target="_blank"
                rel="noopener"
                aria-label="Articcus on LinkedIn"
              >
                <svg className="icf" aria-hidden="true">
                  <use href="#i-linkedin"></use>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/articcus.global/"
                target="_blank"
                rel="noopener"
                aria-label="Articcus on Instagram"
              >
                <svg className="ic" aria-hidden="true">
                  <use href="#i-instagram"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
