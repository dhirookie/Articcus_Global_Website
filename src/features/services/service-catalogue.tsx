import Link from 'next/link';
import { GROUP_IDS, GROUPS, SERVICES } from '@/data/catalogue';
import { Icon } from '@/components/ui/icon';
import { css } from '@/lib/styles';

export function ServiceOverview() {
  const colors = { start: 'c1', build: 'c6', run: 'c5' };
  return (
    <div className="overview" id="overview">
      {GROUP_IDS.map((group, index) => (
        <article
          className="ov-card reveal"
          key={group}
          style={css({ '--d': index })}
        >
          <div className={`ov-top ${colors[group]}`}>
            <span>{['First step', 'Core systems', 'Ongoing'][index]}</span>
            <h3>{GROUPS[group].name}</h3>
            <p>{GROUPS[group].desc}</p>
          </div>
          <ul className="ov-list">
            {SERVICES.filter((service) => service.g === group).map(
              (service) => (
                <li key={service.id}>
                  <Link href={`/services#${service.id}`}>
                    {service.name}
                    <small>
                      {group === 'run'
                        ? service.bill.split(',')[0]
                        : service.time}
                    </small>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function ServiceCatalogue() {
  return (
    <div className="svc-all" id="svc-all">
      {GROUP_IDS.map((group) => (
        <div key={group}>
          <h3>{GROUPS[group].name}</h3>
          <ul>
            {SERVICES.filter((service) => service.g === group).map(
              (service) => (
                <li key={service.id}>
                  <Link href={`/services#${service.id}`}>
                    <span className={`mini-ic ${service.c}`}>
                      <Icon name={service.icon} />
                    </span>
                    <span>
                      <b>{service.name}</b>
                      <small>
                        {group === 'run'
                          ? service.bill
                          : `${service.time} · ${service.bill}`}
                      </small>
                    </span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
