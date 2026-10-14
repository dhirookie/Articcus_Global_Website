import Link from 'next/link';
import { SOLUTION_EXAMPLES } from '@/data/solution-examples';
import { Icon } from '@/components/ui/icon';

export function SolutionCards() {
  return (
    <div className="content-grid">
      {SOLUTION_EXAMPLES.map((example) => (
        <article className={`content-card ${example.color}`} key={example.slug}>
          <span className="mini-ic">
            <Icon name={example.icon} />
          </span>
          <p className="example-label">
            Illustrative example · {example.industry}
          </p>
          <h3 className="h3">
            <Link href={`/solutions/${example.slug}`}>{example.title}</Link>
          </h3>
          <p>{example.problem}</p>
          <Link className="link-arrow" href={`/solutions/${example.slug}`}>
            Explore the workflow
            <Icon name="arrow" />
          </Link>
        </article>
      ))}
    </div>
  );
}
