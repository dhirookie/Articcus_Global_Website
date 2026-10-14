'use client';

import { useRouter } from 'next/navigation';
import type { ButtonHTMLAttributes } from 'react';
import { isIndustryId, isServiceId } from '@/data/catalogue';
import { useBrief } from './brief-provider';
import { trackEvent } from '@/features/analytics/events';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  services: readonly string[];
  mode?: 'toggle' | 'navigate';
  industry?: string;
}
export function BriefAction({
  services,
  mode = 'navigate',
  industry = '',
  children,
  ...props
}: Props) {
  const brief = useBrief();
  const router = useRouter();
  const ids = services.filter(isServiceId);
  const pressed =
    ids.length > 0 && ids.every((id) => brief.services.includes(id));
  return (
    <button
      {...props}
      type="button"
      aria-pressed={mode === 'toggle' ? pressed : undefined}
      onClick={() => {
        if (mode === 'toggle') {
          const id = ids[0];
          if (id) {
            if (!brief.services.includes(id)) trackEvent('brief_add', id);
            brief.toggle(id);
          }
          return;
        }
        brief.add(ids, isIndustryId(industry) ? industry : '');
        for (const id of ids)
          if (!brief.services.includes(id)) trackEvent('brief_add', id);
        router.push('/contact#start');
      }}
    >
      {children}
    </button>
  );
}
