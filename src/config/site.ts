export const site = {
  name: 'Articcus',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://articcus.com',
  description:
    'Articcus designs, builds and runs websites, apps, automations and AI tools for businesses that have outgrown manual operations.',
  email: 'hello@articcus.com',
  phone: '+94775701404',
} as const;

export const navigation = [
  { href: '/industries', label: 'Industries' },
  { href: '/how-we-work', label: 'How we work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
] as const;
