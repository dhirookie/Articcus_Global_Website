import { getService, INDUSTRIES } from '@/data/catalogue';
import { suggestModel } from '@/features/brief/suggest-model';
import type { Lead } from './lead-schema';

export function industryName(id: string): string {
  return id === 'other'
    ? 'Other'
    : INDUSTRIES.find((industry) => industry.id === id)?.name || '';
}

export function briefText(lead: Lead, reference: string) {
  const model = suggestModel(lead.services);
  return [
    'Articcus project brief',
    `Reference: ${reference}`,
    '',
    `Name: ${lead.name}`,
    `Company: ${lead.company}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    `Preferred contact: ${lead.contact}`,
    lead.industry ? `Industry: ${industryName(lead.industry)}` : null,
    lead.size ? `Team size: ${lead.size}` : null,
    lead.timing ? `Start: ${lead.timing}` : null,
    '',
    'Services:',
    ...(lead.services.length
      ? lead.services.map((id) => {
          const service = getService(id);
          return `- ${service.name} (${service.g === 'run' ? service.bill : service.time})`;
        })
      : ['- Not sure yet']),
    model ? `\nSuggested way to work: ${model.name}` : null,
    lead.problem ? `\nWhat is not working today:\n${lead.problem}` : null,
    lead.budget ? `\nBudget range: ${lead.budget}` : null,
  ]
    .filter((line) => line !== null)
    .join('\n');
}
