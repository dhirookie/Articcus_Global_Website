export interface Guide {
  slug: string;
  title: string;
  description: string;
  sections: readonly {
    heading: string;
    paragraphs: readonly string[];
    checklist?: readonly string[];
  }[];
  relatedService: string;
}
export const GUIDES: readonly Guide[] = [
  {
    slug: 'when-to-replace-spreadsheets',
    title: 'When is it time to replace a spreadsheet?',
    description:
      'Use the cost of mistakes, repeated work and missing visibility to decide whether your business needs a shared system.',
    relatedService: 'webapp',
    sections: [
      {
        heading: 'Start by recording what the spreadsheet does well',
        paragraphs: [
          'A spreadsheet can be the right tool for a small, flexible process. Replacing it makes sense when the cost of keeping it reliable becomes greater than the cost of a shared system. Start with one workflow, rather than trying to rebuild the whole business at once.',
        ],
      },
      {
        heading: 'Look for operating problems, not just a large file',
        paragraphs: [
          'The strongest signals are repeated entry, unclear ownership, conflicting versions and decisions made from stale information. Record how often these happen and who spends time fixing them.',
        ],
        checklist: [
          'Are several people editing separate copies?',
          'Is the same order typed into more than one system?',
          'Can you tell who approved or changed a record?',
          'Do managers wait for someone to compile a report?',
          'Do mistakes affect customers, stock or payments?',
        ],
      },
      {
        heading: 'Compare the smallest useful options',
        paragraphs: [
          'A cleaner template, a shared workspace, an existing platform or one automation may solve the immediate problem. Custom software becomes a stronger option when your workflow has important requirements that existing tools cannot reasonably support. Include migration, training and maintenance in the comparison.',
        ],
      },
      {
        heading: 'Agree a baseline and a first milestone',
        paragraphs: [
          'Measure one normal week: transaction volume, time spent entering data, corrections and time to produce a report. Choose one end-to-end journey for the first release and define how staff will test it. Keep a fallback during the transition.',
        ],
        checklist: [
          'Name the process owner.',
          'Collect representative records and exceptions.',
          'Agree what information moves and what stays.',
          'Define a reviewable first release.',
          'Compare the same measures after adoption.',
        ],
      },
    ],
  },
  {
    slug: 'custom-software-or-existing-platform',
    title: 'Custom software or an existing platform?',
    description:
      'Compare workflow fit, ownership, integration and total operating cost before choosing what to build.',
    relatedService: 'webapp',
    sections: [
      {
        heading: 'Describe the workflow before looking at features',
        paragraphs: [
          'Write down the people involved, the information they need and the decisions they make. Include exceptions such as returns, rejected approvals and missing data. A product feature list is useful only when it maps to that work.',
        ],
      },
      {
        heading: 'When an existing platform is a good starting point',
        paragraphs: [
          'A platform can be suitable when its standard workflow fits the important parts of your process. Check configuration options, exports, access controls and integration support. Include licence costs and the effort of changing how your team works. Avoid buying many unused features to solve a small problem.',
        ],
      },
      {
        heading: 'When a custom build deserves consideration',
        paragraphs: [
          'Custom software may suit a distinctive workflow, an unusual customer journey or several systems that need to behave as one. It also brings responsibility for testing, hosting, updates and support. A prototype and a scoped first release help you evaluate those trade-offs before a large commitment.',
        ],
      },
      {
        heading: 'Compare the full cost and exit options',
        paragraphs: [
          'Ask each provider for a comparable scope and a clear list of assumptions. The lower initial price may not be the lower operating cost. Check who owns the code, how data can be exported, what happens when an integration changes and how support is billed.',
        ],
        checklist: [
          'Initial setup or development',
          'Licences, hosting and transaction or API charges',
          'Migration and staff training',
          'Integrations and their ongoing upkeep',
          'Maintenance, support and future changes',
          'Data export, access handover and exit arrangements',
        ],
      },
      {
        heading: 'Use discovery to reduce uncertainty',
        paragraphs: [
          'For a larger project, a bounded discovery phase should produce a workflow map, priorities, a prototype where useful, and a costed scope. You should be able to review those outputs before deciding whether to proceed with development.',
        ],
      },
    ],
  },
  {
    slug: 'what-affects-project-cost',
    title: 'What affects a website or software project quote?',
    description:
      'Understand the assumptions, dependencies and ongoing costs behind a comparable project estimate.',
    relatedService: 'website',
    sections: [
      {
        heading: 'Ask for a scope you can compare',
        paragraphs: [
          'Two quotes for a website or application can cover very different work. Compare the pages or workflows, user roles, integrations, content responsibility and review milestones. A useful quote says what is included, what is separate and which assumptions affect the price.',
        ],
      },
      {
        heading: 'Identify the work that adds uncertainty',
        paragraphs: [
          'Clean content and a simple enquiry form are different from a complex product catalogue, online payments or a migration from several old systems. Integrations depend on API access and documentation. Existing data may need cleaning before it can be imported. New user roles and approval exceptions also need design and testing.',
        ],
      },
      {
        heading: 'Separate build costs from running costs',
        paragraphs: [
          'Domain renewal, hosting, platform licences, payment fees, AI usage and ongoing support may continue after launch. Request a list of recurring costs, who pays each provider, and what happens if usage changes. A maintenance plan should explain its coverage and limits.',
        ],
      },
      {
        heading: 'Make feedback and changes explicit',
        paragraphs: [
          'The schedule depends on access, approved content and timely decisions as well as development. Nominate one person to consolidate feedback. Ask how new requests are estimated and approved, and what counts as a defect against the signed scope.',
        ],
        checklist: [
          'Which deliverables are reviewed at each milestone?',
          'What is required before work can start?',
          'How are extra requests priced and approved?',
          'What tests must pass before delivery is accepted?',
          'What warranty applies to defects?',
          'What support is available after the warranty?',
        ],
      },
      {
        heading: 'Bring enough context to the first conversation',
        paragraphs: [
          'Share the problem, the people affected, a sample workflow, any deadline and a rough budget if you have one. You do not need a technical specification to start. A concrete example of what is not working is more useful than a long list of desired features.',
        ],
      },
    ],
  },
];
export function getGuide(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug);
}
