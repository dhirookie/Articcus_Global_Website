'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { INDUSTRIES } from '@/data/catalogue';
import { Icon } from '@/components/ui/icon';
import { IndustryCard } from './industry-card';

export function IndustryCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({
    previous: false,
    next: true,
    percent: 8,
    first: 1,
    last: 3,
  });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => {
      const card = element.querySelector<HTMLElement>('.icard');
      if (!card) return;
      const step = card.getBoundingClientRect().width + 16;
      const maximum = element.scrollWidth - element.clientWidth;
      const x = element.scrollLeft;
      const first = Math.min(INDUSTRIES.length, Math.round(x / step) + 1);
      const visible = Math.max(
        1,
        Math.floor(
          (element.clientWidth -
            parseFloat(getComputedStyle(element).paddingLeft)) /
            step,
        ),
      );
      setProgress({
        previous: x > 4,
        next: x < maximum - 4,
        percent: maximum > 0 ? Math.max(8, (x / maximum) * 100) : 100,
        first,
        last: Math.min(INDUSTRIES.length, first + visible - 1),
      });
    };
    let frame = 0;
    const scroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener('scroll', scroll, { passive: true });
    update();
    return () => {
      observer.disconnect();
      element.removeEventListener('scroll', scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  function move(direction: number) {
    const element = ref.current;
    const card = element?.querySelector('.icard');
    if (!element || !card) return;
    element.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 16),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }
  return (
    <section className="on-deep ind" aria-labelledby="ind-title">
      <div className="wrap sec-head-row">
        <div className="sec-head reveal">
          <p className="eyebrow">Industries</p>
          <h2 className="h2" id="ind-title">
            Every industry has its own bottleneck
          </h2>
          <p className="lead">Where we usually start in each one.</p>
        </div>
        <div className="car-ctrl">
          <span className="car-count" id="car-count" aria-live="polite">
            {progress.first === progress.last
              ? progress.first
              : `${progress.first}–${progress.last}`}{' '}
            of {INDUSTRIES.length}
          </span>
          <button
            type="button"
            className="car-btn"
            id="car-prev"
            aria-label="Previous industries"
            disabled={!progress.previous}
            onClick={() => move(-1)}
          >
            <Icon name="arrow-l" />
          </button>
          <button
            type="button"
            className="car-btn"
            id="car-next"
            aria-label="Next industries"
            disabled={!progress.next}
            onClick={() => move(1)}
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      <div
        className="car"
        id="car"
        role="region"
        aria-label="Industries"
        tabIndex={0}
        ref={ref}
      >
        {INDUSTRIES.map((industry, index) => (
          <IndustryCard
            industry={industry}
            key={industry.id}
            label={`${industry.name}, ${index + 1} of ${INDUSTRIES.length}`}
          />
        ))}
      </div>
      <div className="wrap car-foot">
        <div className="car-track" aria-hidden="true">
          <div
            className="car-fill"
            id="car-fill"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
        <Link className="link-arrow" href="/industries">
          See all industries
          <Icon name="arrow" />
        </Link>
      </div>
    </section>
  );
}
