function bookingHref(): string {
  const value = process.env.NEXT_PUBLIC_BOOKING_URL;
  if (!value) return '/contact#enquiry';
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : '/contact#enquiry';
  } catch {
    return '/contact#enquiry';
  }
}

export const site = {
  name: 'Articcus',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://articcus.com',
  description:
    'Articcus builds websites, business software and automations for growing teams, with agreed scope, milestones and ongoing support.',
  email: 'hello@articcus.com',
  phone: '+94775701404',
  discoveryHref: bookingHref(),
  whatsappHref: 'https://wa.me/94775701404',
} as const;

export const navigation = [
  { href: '/industries', label: 'Industries' },
  { href: '/how-we-work', label: 'How we work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
] as const;
