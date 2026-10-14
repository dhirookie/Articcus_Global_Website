import { z } from 'zod';
import { isServiceId, type ServiceId } from '@/data/catalogue';

export const eventNames = [
  'page_view',
  'discovery_click',
  'brief_add',
  'brief_submit',
  'brief_success',
  'brief_error',
  'enquiry_submit',
  'enquiry_success',
  'enquiry_error',
  'web_vital',
] as const;
export type EventName = (typeof eventNames)[number];
export const analyticsSchema = z
  .object({
    name: z.enum(eventNames),
    page: z.enum([
      'home',
      'services',
      'industries',
      'process',
      'pricing',
      'contact',
      'about',
      'solutions',
      'guides',
      'privacy',
      'other',
    ]),
    serviceId: z.custom<ServiceId>(isServiceId).optional(),
    metric: z.enum(['LCP', 'INP', 'CLS']).optional(),
    value: z.number().finite().nonnegative().max(120000).optional(),
  })
  .strict()
  .superRefine((event, context) => {
    if (
      event.name === 'web_vital' &&
      (!event.metric || event.value === undefined)
    )
      context.addIssue({
        code: 'custom',
        message: 'A web vital needs a metric and numeric value.',
      });
    if (
      event.name !== 'web_vital' &&
      (event.metric !== undefined || event.value !== undefined)
    )
      context.addIssue({
        code: 'custom',
        message: 'Metrics are only accepted for web vital events.',
      });
  });

export function pageCategory(
  pathname: string,
): z.infer<typeof analyticsSchema>['page'] {
  if (pathname === '/') return 'home';
  const root = pathname.split('/')[1];
  if (root === 'how-we-work') return 'process';
  if (
    root === 'services' ||
    root === 'industries' ||
    root === 'pricing' ||
    root === 'contact' ||
    root === 'about' ||
    root === 'solutions' ||
    root === 'guides' ||
    root === 'privacy'
  )
    return root;
  return 'other';
}

/** Event payloads contain categories, never form contents or free text. */
export function trackEvent(name: EventName, serviceId?: ServiceId) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('articcus:event', {
      detail: { name, ...(serviceId ? { serviceId } : {}) },
    }),
  );
}
