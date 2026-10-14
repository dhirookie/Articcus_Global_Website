import Link from 'next/link';
import { INDUSTRIES } from '@/data/catalogue';
import { Icon } from '@/components/ui/icon';
import { IndustryCard } from './industry-card';

export function IndustryGrid() {
  return (
    <div className="igrid" id="igrid">
      {INDUSTRIES.map((industry) => (
        <IndustryCard key={industry.id} industry={industry} />
      ))}
      <article className="icard icard-more">
        <span className="icard-ic">
          <Icon name="plus" />
        </span>
        <h3>Don&apos;t see your industry?</h3>
        <p>
          The problems are usually the same: manual work, lost orders and slow
          reports.
        </p>
        <div />
        <Link className="ibtn" href="/contact#start">
          Tell us about your business
          <Icon name="arrow" />
        </Link>
      </article>
    </div>
  );
}

export function IndustryMarquee() {
  return (
    <div className="marq-track" id="marq-track">
      {[false, true].map((duplicate) => (
        <div
          className="marq-group"
          key={String(duplicate)}
          aria-hidden={duplicate || undefined}
        >
          {INDUSTRIES.map((industry) => (
            <span className="marq-item" key={industry.id}>
              <i className={industry.c}>
                <Icon name={industry.icon} />
              </i>
              {industry.name}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
