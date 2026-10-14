import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { css } from '@/lib/styles';
import { Cta } from '@/components/layout/cta';
import { ServiceCatalogue } from '@/features/services/service-catalogue';
import { ServiceExplorer } from '@/features/services/service-explorer';

export const metadata = pageMetadata(
  'Services · Articcus',
  'Websites, web apps, mobile apps, automation, ERP and CRM, dashboards, AI, integrations, managed IT and dedicated developers from Articcus.',
  '/services',
);

export default function ServicesPage() {
  return (
    <>
      <main id="main">
        <section className="phero" aria-labelledby="page-title">
          <div className="wrap phero-inner">
            <div className="phero-copy">
              <p className="crumbs">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>Services</span>
              </p>
              <p className="eyebrow">Services</p>
              <h1 className="h1 sm" id="page-title">
                Everything you need, from a first website to a full platform
              </h1>
              <p className="lead">
                Start small, build what fits, and let us keep it running.
              </p>
              <div className="phero-ctas">
                <Link className="btn btn-primary btn-lg" href="/contact#start">
                  Start a project
                  <svg className="ic arrow" aria-hidden="true">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
                <Link className="btn btn-outline btn-lg" href="/pricing">
                  See how pricing works
                </Link>
              </div>
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
                  <use href="#i-globe"></use>
                </svg>
              </span>
              <span
                className="ft c4"
                style={css({
                  left: '40px',
                  bottom: '6px',
                  '--r': '6deg',
                  '--dl': '-2s',
                })}
                aria-hidden="true"
              >
                <svg className="ic" aria-hidden="true">
                  <use href="#i-bolt"></use>
                </svg>
              </span>
              <span
                className="ft c2"
                style={css({
                  right: '0',
                  bottom: '30px',
                  '--r': '-5deg',
                  '--dl': '-4s',
                })}
                aria-hidden="true"
              >
                <svg className="ic" aria-hidden="true">
                  <use href="#i-spark"></use>
                </svg>
              </span>
            </div>
          </div>
        </section>
        <ServiceExplorer />
        <section className="sec" aria-labelledby="all-title">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">At a glance</p>
              <h2 className="h2" id="all-title">
                All 18 services, with typical timelines
              </h2>
            </div>
            <ServiceCatalogue />
          </div>
        </section>
        <Cta />
      </main>
    </>
  );
}
