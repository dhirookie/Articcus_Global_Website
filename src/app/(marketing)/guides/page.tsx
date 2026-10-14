import Link from 'next/link';
import { GUIDES } from '@/data/guides';
import { pageMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/content/page-hero';

export const metadata = pageMetadata(
  'Practical project guides · Articcus',
  'Buying guides for choosing business software, planning a first project and understanding delivery costs.',
  '/guides',
);
export default function GuidesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Project guides"
        title="Make the next technology decision with a clearer picture"
        description="Practical questions to ask before replacing a spreadsheet, choosing a platform, or comparing project quotes."
        action={false}
      />
      <section className="sec">
        <div className="wrap content-grid">
          {GUIDES.map((guide) => (
            <article className="content-card" key={guide.slug}>
              <p className="eyebrow">Buying guide</p>
              <h2 className="h3">
                <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
              </h2>
              <p>{guide.description}</p>
              <Link className="link-arrow" href={`/guides/${guide.slug}`}>
                Read the guide
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
