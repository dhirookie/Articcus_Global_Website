import { z } from 'zod';
import { isIndustryId, isServiceId, type ServiceId } from '@/data/catalogue';

const text = (max: number) => z.string().trim().max(max);

export const leadSchema = z
  .object({
    mode: z.enum(['brief', 'enquiry']).default('brief'),
    services: z
      .array(z.custom<ServiceId>(isServiceId, 'Choose a valid service.'))
      .max(18)
      .transform((ids) => [...new Set(ids)]),
    industry: text(80).refine(
      (value) => !value || value === 'other' || isIndustryId(value),
      'Choose a valid industry.',
    ),
    size: z.enum([
      '',
      '1–9 people',
      '10–50 people',
      '51–200 people',
      'More than 200 people',
    ]),
    timing: z.enum([
      '',
      'As soon as possible',
      'Within 3 months',
      'In 3 to 6 months',
      'Just exploring',
    ]),
    problem: text(5000),
    budget: text(200),
    name: text(120).min(1, 'Enter your full name.'),
    company: text(200),
    email: text(254).pipe(
      z.email('Enter a valid email, like name@company.com.'),
    ),
    phone: text(60),
    contact: z.enum(['Email', 'Phone call', 'WhatsApp']),
    website: z.string().max(0, 'Please leave this field empty.').default(''),
  })
  .superRefine((lead, context) => {
    if (lead.mode === 'brief' && !lead.company)
      context.addIssue({
        code: 'custom',
        path: ['company'],
        message: 'Enter your company name.',
      });
    if (lead.mode === 'enquiry' && lead.problem.length < 10)
      context.addIssue({
        code: 'custom',
        path: ['problem'],
        message:
          'Tell us a little about what you need (at least 10 characters).',
      });
    if (
      lead.mode === 'brief' &&
      !lead.services.length &&
      lead.problem.length < 10
    )
      context.addIssue({
        code: 'custom',
        path: ['services'],
        message:
          'Choose at least one service, or describe the problem in step 2.',
      });
    if (lead.contact !== 'Email' && !lead.phone)
      context.addIssue({
        code: 'custom',
        path: ['phone'],
        message: `Enter a number so we can reach you by ${lead.contact === 'WhatsApp' ? 'WhatsApp' : 'phone'}.`,
      });
    else if (lead.phone && lead.phone.replace(/\D/g, '').length < 9)
      context.addIssue({
        code: 'custom',
        path: ['phone'],
        message: 'Enter a full phone number, for example +94 77 123 4567.',
      });
  });

export type Lead = z.infer<typeof leadSchema>;
export type LeadErrors = Partial<Record<keyof Lead | 'form', string>>;

export function validationErrors(error: z.ZodError): LeadErrors {
  const errors: LeadErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] || 'form') as keyof LeadErrors;
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
