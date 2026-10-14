'use client';

import { getService } from '@/data/catalogue';
import { useBrief } from '@/features/brief/brief-provider';
import { suggestModel } from '@/features/brief/suggest-model';
import { industryName } from './brief-text';
import type { Lead } from './lead-schema';

export function BriefSummary({
  size,
  timing,
  submitted,
}: {
  size: string;
  timing: string;
  submitted?: Lead | undefined;
}) {
  const brief = useBrief();
  const services = submitted?.services || brief.services;
  const industry = submitted?.industry || brief.industry;
  const model = suggestModel(services);
  return (
    <aside className="brief" aria-labelledby="brief-title">
      <h2 id="brief-title">Your brief</h2>
      <div id="brief-services">
        {services.length ? (
          <ul className="brief-list">
            {services.map((id) => {
              const service = getService(id);
              return (
                <li key={id}>
                  <span>{service.name}</span>
                  <span>{service.g === 'run' ? 'Monthly' : service.time}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="brief-empty">
            Pick services in step 1, or add them from any page on this site, and
            your brief builds here.
          </p>
        )}
      </div>
      <div
        className="brief-facts"
        id="brief-facts"
        hidden={!industry && !size && !timing}
      >
        {industry && (
          <span>
            <b>Industry:</b> {industryName(industry)}
          </span>
        )}
        {size && (
          <span>
            <b>Team:</b> {size}
          </span>
        )}
        {timing && (
          <span>
            <b>Start:</b> {timing}
          </span>
        )}
      </div>
      <div className="model-box" id="model-box" hidden={!model}>
        <small>Suggested way to work</small>
        <strong id="model-name">{model?.name}</strong>
        <p id="model-why">{model?.why}</p>
      </div>
      <div>
        <p className="brief-sub">What happens next</p>
        <ol className="next-steps">
          <li>
            <span>
              <b>We aim to reply within one working day</b> to arrange a
              conversation.
            </span>
          </li>
          <li>
            <span>
              <b>A 30-minute discovery call</b>, free, with a written summary
              with next steps confirmed afterwards.
            </span>
          </li>
          <li>
            <span>
              <b>A costed estimate once the scope is understood</b>, checked by
              our tech lead.
            </span>
          </li>
        </ol>
      </div>
    </aside>
  );
}
