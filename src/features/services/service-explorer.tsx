'use client';

import { useEffect, useState } from 'react';
import {
  GROUPS,
  GROUP_IDS,
  SERVICES,
  getService,
  isServiceId,
  type ServiceId,
} from '@/data/catalogue';
import { Icon } from '@/components/ui/icon';
import { handleTabKey } from '@/components/ui/tabs';
import { BriefAction } from '@/features/brief/brief-action';
import { useBrief } from '@/features/brief/brief-provider';

export function ServiceExplorer() {
  const [selected, setSelected] = useState<ServiceId>('website');
  const { services } = useBrief();
  const service = getService(selected);
  const groupIndex = GROUP_IDS.indexOf(service.g);
  useEffect(() => {
    const synchronize = () => {
      const id = window.location.hash.slice(1);
      if (isServiceId(id)) setSelected(id);
    };
    synchronize();
    // Link navigation can update history without firing hashchange.
    const click = (event: MouseEvent) => {
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href]')
          : null;
      if (!anchor) return;
      const url = new URL(anchor.href);
      const id = url.hash.slice(1);
      if (
        url.origin === location.origin &&
        url.pathname === '/services' &&
        isServiceId(id)
      )
        setSelected(id);
    };
    window.addEventListener('hashchange', synchronize);
    window.addEventListener('popstate', synchronize);
    document.addEventListener('click', click);
    return () => {
      window.removeEventListener('hashchange', synchronize);
      window.removeEventListener('popstate', synchronize);
      document.removeEventListener('click', click);
    };
  }, []);
  const select = (id: ServiceId) => {
    setSelected(id);
    window.history.replaceState(null, '', `#${id}`);
  };
  const selectGroup = (index: number) => {
    const group = GROUP_IDS[index];
    const first = SERVICES.find((item) => item.g === group);
    if (first) select(first.id);
  };
  return (
    <section className="sec svc" id="explorer" aria-labelledby="exp-title">
      <div className="wrap">
        <div className="sec-head reveal" style={{ marginBottom: 32 }}>
          <p className="eyebrow">Explore</p>
          <h2 className="h2" id="exp-title">
            Pick a service to see what you get
          </h2>
        </div>
        <div className="svc-top">
          <div
            className="groups"
            role="tablist"
            aria-label="Service groups"
            id="groups"
          >
            {GROUP_IDS.map((group, index) => (
              <button
                className="group-btn"
                type="button"
                role="tab"
                key={group}
                id={`g-${group}`}
                aria-controls="svc-panel"
                aria-selected={service.g === group}
                tabIndex={service.g === group ? 0 : -1}
                onClick={() => selectGroup(index)}
                onKeyDown={(event) =>
                  handleTabKey(event, groupIndex, GROUP_IDS.length, selectGroup)
                }
              >
                {GROUPS[group].name}
              </button>
            ))}
          </div>
          <p className="group-desc" id="group-desc">
            {GROUPS[service.g].desc}
          </p>
        </div>
        <div id="svc-panel" role="tabpanel" aria-labelledby={`g-${service.g}`}>
          <div className="svc-body">
            <div
              className="svc-list"
              id="svc-list"
              aria-label="Services in this group"
            >
              {SERVICES.filter((item) => item.g === service.g).map((item) => (
                <button
                  type="button"
                  className="svc-item"
                  key={item.id}
                  aria-pressed={item.id === selected}
                  onClick={() => select(item.id)}
                >
                  <span className={`svc-ic ${item.c}`}>
                    <Icon name={item.icon} />
                  </span>
                  <span>
                    <span className="svc-name">{item.name}</span>
                    <span className="svc-time">
                      {item.g === 'run' ? item.bill : item.time}
                    </span>
                  </span>
                  {services.includes(item.id) ? (
                    <span className="in-brief" title="In your brief">
                      <Icon name="check" />
                    </span>
                  ) : (
                    <span />
                  )}
                </button>
              ))}
            </div>
            <div className="svc-detail" id="svc-detail" aria-live="polite">
              <div className="sd-head">
                <span className={`sd-ic ${service.c}`}>
                  <Icon name={service.icon} />
                </span>
                <h3 className="h3">{service.name}</h3>
              </div>
              <p className="sd-what">{service.what}</p>
              <div className={`sd-quote ${service.c}`}>
                <span>You might need this if you are saying</span>
                <blockquote>“{service.hear}”</blockquote>
              </div>
              <dl className="sd-meta">
                <div>
                  <dt>
                    {service.g === 'run' ? 'Commitment' : 'Typical timeline'}
                  </dt>
                  <dd>{service.time}</dd>
                </div>
                <div>
                  <dt>Usually billed</dt>
                  <dd>{service.bill}</dd>
                </div>
                <div>
                  <dt>Often followed by</dt>
                  <dd>{service.next}</dd>
                </div>
              </dl>
              <div className="sd-actions">
                <BriefAction
                  className="btn btn-primary btn-add"
                  services={[service.id]}
                  mode="toggle"
                >
                  <span className="when-off">Add to my brief</span>
                  <span className="when-on">Added to your brief</span>
                </BriefAction>
                <BriefAction
                  className="btn btn-outline"
                  services={[service.id]}
                >
                  Ask about this
                </BriefAction>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
