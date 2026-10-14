import type { ServiceId } from './catalogue';

interface SolutionExample {
  slug: string;
  title: string;
  industry: string;
  problem: string;
  approach: string;
  steps: readonly string[];
  measures: readonly string[];
  boundaries: string;
  services: readonly ServiceId[];
  icon: string;
  color: string;
}

export const SOLUTION_EXAMPLES: readonly SolutionExample[] = [
  {
    slug: 'order-to-invoice',
    title: 'From a dealer order to an invoice',
    industry: 'Retail and distribution',
    problem:
      'An order arrives by message. Staff retype it into a stock sheet, check availability, and enter it again in accounting. Exceptions are handled in separate conversations.',
    approach:
      'An ordering portal captures the information once. An integration checks stock and creates an invoice after the agreed approval. A shared status view shows what needs attention.',
    steps: [
      'Dealer submits an order',
      'Stock and account checks run',
      'An authorised person approves exceptions',
      'Invoice is created in accounting',
      'The customer receives an update',
    ],
    measures: [
      'Time from order receipt to invoice',
      'Number of transactions entered more than once',
      'Orders requiring manual correction',
      'Time spent resolving stock discrepancies',
    ],
    boundaries:
      'The actual design depends on your stock system, accounting API, approval rules and source data. Establish a baseline before choosing a target improvement.',
    services: ['webapp', 'integration', 'automation'],
    icon: 'cart',
    color: 'c1',
  },
  {
    slug: 'customer-enquiries',
    title: 'A clearer route from website visit to enquiry',
    industry: 'Service businesses',
    problem:
      'Visitors cannot easily tell what the business offers. Questions arrive through several channels, and the person responding does not have the full context.',
    approach:
      'Service pages answer the main buying questions. A short enquiry form captures the immediate need, while a detailed brief is available for people who have already thought through the project.',
    steps: [
      'Visitor finds a relevant service',
      'They review scope and next steps',
      'They send a short enquiry or a brief',
      'The enquiry reaches the responsible person',
      'A discovery call clarifies the fit',
    ],
    measures: [
      'Enquiries successfully received',
      'Time to the first response',
      'Enquiries that become qualified conversations',
      'Reasons visitors abandon the form',
    ],
    boundaries:
      'A website needs relevant traffic and a reliable response process. A redesign alone does not guarantee leads or sales.',
    services: ['website', 'erp'],
    icon: 'globe',
    color: 'c5',
  },
  {
    slug: 'document-answers',
    title: 'Finding answers in approved company documents',
    industry: 'Operations and professional services',
    problem:
      'Staff search several folders or ask colleagues for the same policy and process answers. Outdated documents can lead to inconsistent advice.',
    approach:
      'A bounded assistant searches an approved collection, returns source references, and escalates when the documents do not support an answer. Access and evaluation come before wider rollout.',
    steps: [
      'Sources are approved and versioned',
      'Staff ask a work-related question',
      'The assistant retrieves relevant material',
      'An answer includes source references',
      'Uncertain questions go to a person',
    ],
    measures: [
      'Answers supported by the cited documents',
      'Time spent finding a correct answer',
      'Escalations handled by a person',
      'Questions answered from outdated material',
    ],
    boundaries:
      'AI may give incorrect answers. Test representative questions, enforce source access, and keep human review for consequential decisions.',
    services: ['ai', 'workspace'],
    icon: 'spark',
    color: 'c2',
  },
];

export function getSolutionExample(slug: string) {
  return SOLUTION_EXAMPLES.find((example) => example.slug === slug);
}
