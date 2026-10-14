import type { ServiceId } from './catalogue';

export interface ServiceDetail {
  id: ServiceId;
  title: string;
  introduction: string;
  fit: string;
  deliverables: readonly string[];
  boundaries: readonly string[];
  responsibilities: readonly string[];
  acceptance: string;
  example: string;
}

export const SERVICE_DETAILS: readonly ServiceDetail[] = [
  {
    id: 'website',
    title: 'Business websites built to turn interest into enquiries',
    introduction:
      'Give customers a clear view of what you offer, a site that works on their phone, and a straightforward way to reach you.',
    fit: 'Your current website is outdated, difficult to update, or does not explain your business clearly.',
    deliverables: [
      'An agreed page structure and responsive design',
      'Service or product content arranged around customer questions',
      'Enquiry forms and agreed contact integrations',
      'Page titles, descriptions, sitemap and indexing foundations',
      'Launch checks, access handover and guidance for agreed updates',
    ],
    boundaries: [
      'Domain, hosting and paid tools are quoted separately.',
      'Copywriting, photography, translations and online payments are included only when agreed.',
      'Search rankings and a particular number of enquiries cannot be guaranteed.',
    ],
    responsibilities: [
      'Share your brand assets, approved content and existing access.',
      'Choose one person to consolidate feedback.',
      'Approve the content and test enquiries before launch.',
    ],
    acceptance:
      'Review the agreed pages on phone and desktop, test every enquiry path, and confirm the launch checklist together.',
    example: 'customer-enquiries',
  },
  {
    id: 'webapp',
    title: 'Custom business software for the way your team works',
    introduction:
      'Bring orders, bookings, approvals or customer access into one application, with the workflow and permissions agreed before development.',
    fit: 'Spreadsheets and messages have become the main system, and staff repeatedly enter or chase the same information.',
    deliverables: [
      'A workflow map, priorities and acceptance criteria',
      'A prototype for the agreed core journey',
      'Role-based screens and permissions within the agreed scope',
      'Agreed reporting, integrations and data migration',
      'Milestone reviews, deployment and handover documentation',
    ],
    boundaries: [
      'Third-party licences and external API availability are separate dependencies.',
      'Migration scope depends on the quality and accessibility of existing data.',
      'New workflows beyond the signed scope require a reviewed change request.',
    ],
    responsibilities: [
      'Show the real workflow, including exceptions.',
      'Provide sample data and access through agreed secure channels.',
      'Make staff available to review the prototype and test milestones.',
    ],
    acceptance:
      'Test realistic journeys for each agreed user role, reconcile representative data, and sign off the agreed acceptance criteria.',
    example: 'order-to-invoice',
  },
  {
    id: 'automation',
    title: 'Business automation that reduces repeated work',
    introduction:
      'Connect the repetitive steps between your existing systems, with clear rules for exceptions and a person responsible when something needs attention.',
    fit: 'Staff copy information between tools, send the same reminders, or manually route routine approvals.',
    deliverables: [
      'A map of the current process and its exceptions',
      'One clearly defined automation or an agreed set of workflows',
      'Connections to the systems and APIs listed in the scope',
      'Failure alerts, retry rules and a manual fallback',
      'Test cases, operating instructions and a named handover contact',
    ],
    boundaries: [
      'API limits, platform subscriptions and usage charges are quoted separately.',
      'Unavailable APIs or unreliable source data may require a different approach.',
      'An automated step still needs an agreed owner and exception process.',
    ],
    responsibilities: [
      'Explain the business rules and who can approve changes.',
      'Provide sample cases, including failed or unusual transactions.',
      'Nominate someone to receive alerts and own exceptions.',
    ],
    acceptance:
      'Run normal, duplicate and failed transactions; check that alerts reach the right person and the manual fallback works.',
    example: 'order-to-invoice',
  },
  {
    id: 'ai',
    title: 'AI assistants with a defined job and clear boundaries',
    introduction:
      'Start with a bounded use case, such as finding answers in approved company documents. Decide what the assistant may answer, what it should cite, and when it should hand over.',
    fit: 'Your team spends time answering repeated questions or searching a large collection of approved documents.',
    deliverables: [
      'A defined use case and approved information sources',
      'A pilot assistant with agreed access rules',
      'Source references and a human handover for the agreed use case',
      'An evaluation set covering common questions and difficult cases',
      'Usage limits, monitoring needs and operating guidance',
    ],
    boundaries: [
      'AI output can be incorrect; consequential decisions need human review.',
      'Model usage and hosting charges are separate recurring costs.',
      'A pilot proves usefulness for a specific task, rather than replacing every staff role.',
    ],
    responsibilities: [
      'Provide approved, current documents and their access requirements.',
      'Choose subject-matter reviewers for evaluation.',
      'Agree who maintains the sources and handles escalations.',
    ],
    acceptance:
      'Review answers against the agreed evaluation set, test access boundaries, and confirm the assistant handles uncertainty and escalation appropriately.',
    example: 'document-answers',
  },
];

export function getServiceDetail(id: string) {
  return SERVICE_DETAILS.find((detail) => detail.id === id);
}

export function serviceHref(id: ServiceId): string {
  return getServiceDetail(id) ? `/services/${id}` : `/services#${id}`;
}
