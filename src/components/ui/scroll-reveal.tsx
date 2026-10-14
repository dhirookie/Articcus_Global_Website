'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Content stays visible without JavaScript; enhancement adds movement only. */
export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const initialize = () => {
      observer?.disconnect();
      document.documentElement.classList.toggle('motion', !media.matches);
      if (media.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer?.unobserve(entry.target);
            }
          }),
        { rootMargin: '0px 0px -6% 0px' },
      );
      document
        .querySelectorAll('.reveal')
        .forEach((element) => observer?.observe(element));
    };
    const frame = requestAnimationFrame(initialize);
    media.addEventListener('change', initialize);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      document.documentElement.classList.remove('motion');
      media.removeEventListener('change', initialize);
    };
  }, [pathname]);
  return null;
}
