import Link from 'next/link';
import { Icon } from '@/components/ui/icon';

const paths = [
  {
    title: 'Make it easier for customers to find and contact you',
    description:
      'A clear business website, enquiry journey and the right online foundations.',
    icon: 'globe',
    color: 'c1',
    href: '/services/website',
    label: 'Business websites',
    items: [
      'Responsive pages',
      'Clear service content',
      'Working enquiry paths',
    ],
  },
  {
    title: 'Bring repeated work into one reliable process',
    description:
      'Business applications and connected workflows built around how your team operates.',
    icon: 'layers',
    color: 'c6',
    href: '/services/webapp',
    label: 'Business systems',
    items: [
      'Orders and approvals',
      'Integrations and automation',
      'Useful reporting',
    ],
  },
  {
    title: 'Keep the tools your business depends on running',
    description:
      'Choose an ongoing support arrangement with clear coverage, responsibilities and recurring costs.',
    icon: 'wrench',
    color: 'c5',
    href: '/services#maintenance',
    label: 'Ongoing support',
    items: ['Updates and fixes', 'Hosting and backups', 'Agreed change hours'],
  },
] as const;

export function ServicePaths() {
  return (
    <div className="content-grid">
      {paths.map((path) => (
        <article className={`content-card ${path.color}`} key={path.href}>
          <span className="mini-ic">
            <Icon name={path.icon} />
          </span>
          <p className="eyebrow">{path.label}</p>
          <h3 className="h3">{path.title}</h3>
          <p>{path.description}</p>
          <ul className="content-list">
            {path.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link href={path.href} className="link-arrow">
            Explore this starting point
            <Icon name="arrow" />
          </Link>
        </article>
      ))}
    </div>
  );
}
