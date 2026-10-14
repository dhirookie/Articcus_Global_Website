import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/content/page-hero';
import { AnalyticsSettings } from '@/features/analytics/analytics';

export const metadata = pageMetadata(
  'Website privacy · Articcus',
  'How this website uses enquiry details, brief selections and optional website measurement.',
  '/privacy',
);
export default function PrivacyPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Website privacy"
        title="How information is used on this website"
        description="This page describes the website enquiry forms, browser storage and optional measurement. Contact Articcus if you have questions about an enquiry you have sent."
        action={false}
      />
      <section className="sec">
        <div className="wrap reading-copy">
          <h2 className="h3">Information you provide</h2>
          <p>
            The enquiry form collects your name, email and message, with an
            optional company name. The detailed brief also collects your
            selected services and any business context, budget, timing or phone
            details you choose to provide.
          </p>
          <h2 className="h3">Enquiry handling</h2>
          <p>
            Submitted information is used to review and respond to your enquiry.
            Enquiries may be processed by service providers handling delivery
            and enquiry management on Articcus&apos;s behalf. A reference is
            returned after the enquiry has been accepted for delivery. The
            website does not create a customer account or write your contact
            details into browser storage.
          </p>
          <h2 className="h3">Brief selections in your browser</h2>
          <p>
            Selected services and industry are saved in this browser tab so you
            can move between pages without rebuilding your brief. This storage
            normally ends when the tab session ends. A confirmed brief
            submission or starting a new brief clears the saved selections.
          </p>
          <h2 className="h3">Optional website measurement</h2>
          <p>
            When measurement is enabled, we ask for permission first. With
            permission, the website sends page categories, selected service
            identifiers, enquiry completion events and loading or interaction
            performance. These events exclude your name, email, phone number,
            company, message, budget and enquiry reference. Raw page queries are
            not included.
          </p>
          <p>
            Your measurement preference is saved in browser storage. Declining
            measurement does not prevent enquiries or other website features
            from working.
          </p>
          {process.env.ANALYTICS_WEBHOOK_URL && <AnalyticsSettings />}
          <h2 className="h3">External links</h2>
          <p>
            Links to WhatsApp, Google Maps, social networks and any external
            booking service take you to those services. Their own privacy
            practices apply after you visit them.
          </p>
          <h2 className="h3">Questions about submitted information</h2>
          <p>
            To ask about information you submitted or request its correction or
            deletion, email{' '}
            <a href="mailto:hello@articcus.com">hello@articcus.com</a>. Include
            your enquiry reference if available, and avoid sending sensitive
            documents through a public enquiry form.
          </p>
          <Link href="/contact" className="link-arrow">
            Contact Articcus
          </Link>
        </div>
      </section>
    </main>
  );
}
