'use client';

import { GROUPS, GROUP_IDS, SERVICES, INDUSTRIES } from '@/data/catalogue';
import { Icon } from '@/components/ui/icon';
import { useBrief } from '@/features/brief/brief-provider';

export function ServiceChips() {
  const brief = useBrief();
  return (
    <div id="form-chips" style={{ display: 'grid', gap: 20 }}>
      {GROUP_IDS.map((group) => (
        <div className="chip-group" key={group}>
          <h4>{GROUPS[group].name}</h4>
          <div className="chips">
            {SERVICES.filter((service) => service.g === group).map(
              (service) => (
                <span className="ck" key={service.id}>
                  <input
                    type="checkbox"
                    name="services"
                    id={`ck-${service.id}`}
                    value={service.id}
                    checked={brief.services.includes(service.id)}
                    onChange={() => brief.toggle(service.id)}
                  />
                  <label htmlFor={`ck-${service.id}`}>
                    <Icon name="check" />
                    {service.name}
                  </label>
                </span>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function IndustryOptions() {
  return (
    <>
      {INDUSTRIES.map((industry) => (
        <option value={industry.id} key={industry.id}>
          {industry.name}
        </option>
      ))}
      <option value="other">Other</option>
    </>
  );
}
