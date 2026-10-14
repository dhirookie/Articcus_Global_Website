import { pageMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/content/page-hero';
import { SolutionCards } from '@/features/solutions/solution-cards';
import { Cta } from '@/components/layout/cta';

export const metadata = pageMetadata(
  'Solution examples · Articcus',
  'Explore illustrative website, automation and AI workflows, with scope boundaries and ways to measure usefulness.',
  '/solutions',
);
export default function SolutionsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Solution examples"
        title="See how a practical first project could work"
        description="These are illustrative workflows, not client case studies or claims of delivered results. Use them to start a conversation about your own process."
      />
      <section className="sec">
        <div className="wrap">
          <SolutionCards />
        </div>
      </section>
      <Cta />
    </main>
  );
}
