import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import { site } from '@/config/site';
import { BriefProvider } from '@/features/brief/brief-provider';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { IconSprite } from '@/components/layout/icon-sprite';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Analytics } from '@/features/analytics/analytics';
import { StructuredData } from '@/components/content/structured-data';
import '@/styles/globals.css';

const displayFont = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});
const bodyFont = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Articcus',
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
  },
  twitter: { card: 'summary', title: site.name, description: site.description },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#004AAD',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': `${site.url}/#organization`,
            name: site.name,
            url: site.url,
            email: site.email,
            telephone: site.phone,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'No.14, Sir Baron Jayathilake Mawatha',
              addressLocality: 'Colombo',
              postalCode: '00100',
              addressCountry: 'LK',
            },
          }}
        />
        <IconSprite />
        <BriefProvider>
          <Analytics enabled={Boolean(process.env.ANALYTICS_WEBHOOK_URL)} />
          <a className="skip" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <ScrollReveal />
          {children}
          <SiteFooter />
        </BriefProvider>
      </body>
    </html>
  );
}
