import { Icon } from '@/components/ui/icon';
import type { Industry } from '@/data/catalogue';
import { BriefAction } from '@/features/brief/brief-action';

export function IndustryCard({
  industry,
  label,
}: {
  industry: Industry;
  label?: string;
}) {
  return (
    <article
      className={`icard ${industry.c}`}
      id={industry.id}
      aria-label={label}
    >
      <span className="icard-ic">
        <Icon name={industry.icon} />
      </span>
      <h3>{industry.name}</h3>
      <p>{industry.pain}</p>
      <div>
        <p className="lbl">We usually start with</p>
        <div className="pchips">
          {industry.lead.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <BriefAction
        className="ibtn"
        services={industry.svcs}
        industry={industry.id}
      >
        Build a brief for this
        <Icon name="arrow" />
      </BriefAction>
    </article>
  );
}
