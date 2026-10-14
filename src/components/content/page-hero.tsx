import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { site } from '@/config/site';

export function PageHero({
  title,
  description,
  eyebrow,
  action = true,
}: {
  title: string;
  description: string;
  eyebrow: string;
  action?: boolean;
}) {
  return (
    <section className="phero" aria-labelledby="page-title">
      <div className="wrap phero-inner">
        <div className="phero-copy">
          <p className="crumbs">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{eyebrow}</span>
          </p>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h1 sm" id="page-title">
            {title}
          </h1>
          <p className="lead">{description}</p>
          {action && (
            <div className="phero-ctas">
              <Link
                className="btn btn-primary btn-lg"
                href={site.discoveryHref}
                data-discovery
              >
                Request a discovery call
                <Icon name="arrow" />
              </Link>
            </div>
          )}
        </div>
        <div className="phero-art" aria-hidden="true">
          <svg className="arrows" viewBox="0 0 344 339">
            <use href="#arrows" />
          </svg>
        </div>
      </div>
    </section>
  );
}
