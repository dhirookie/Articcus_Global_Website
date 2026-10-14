'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { HERO } from '@/data/catalogue';
import { Icon } from '@/components/ui/icon';
import { handleTabKey } from '@/components/ui/tabs';

const Context = createContext<{
  index: number;
  select: (index: number) => void;
  automatic: boolean;
  paused: boolean;
  pause: (paused: boolean) => void;
} | null>(null);
function useHero() {
  const value = useContext(Context);
  if (!value) throw new Error('Hero components need HeroProvider.');
  return value;
}

export function HeroProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [automatic, setAutomatic] = useState(true);
  const [paused, pause] = useState(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => {
      if (media.matches) setAutomatic(false);
    };
    change();
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    if (!automatic || paused) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % HERO.length),
      5500,
    );
    return () => clearInterval(timer);
  }, [automatic, paused]);
  return (
    <Context.Provider
      value={{
        index,
        automatic,
        paused,
        pause,
        select: (next) => {
          setAutomatic(false);
          setIndex(next);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}

const labels = [
  'Websites',
  'Web apps and portals',
  'Mobile apps',
  'Automation',
  'Dashboards',
  'AI assistants',
];
const icons = ['globe', 'window', 'phone', 'bolt', 'chart', 'spark'];
export function HeroTabs() {
  const { index, select, automatic, paused, pause } = useHero();
  return (
    <div
      className={`tags${automatic ? ' auto' : ''}${paused ? ' paused' : ''}`}
      id="tags"
      role="tablist"
      aria-labelledby="tags-lbl"
      onMouseEnter={() => pause(true)}
      onMouseLeave={() => pause(false)}
      onFocus={() => pause(true)}
      onBlur={() => pause(false)}
    >
      {labels.map((label, tab) => (
        <button
          type="button"
          className="tag-btn"
          role="tab"
          id={`tag-${tab}`}
          key={label}
          aria-selected={index === tab}
          aria-controls="shot"
          tabIndex={index === tab ? 0 : -1}
          onClick={() => select(tab)}
          onKeyDown={(event) =>
            handleTabKey(event, index, labels.length, select)
          }
        >
          <Icon name={icons[tab] || 'globe'} />
          {label}
          <span className="prog" />
        </button>
      ))}
    </div>
  );
}
export function HeroFrame({ children }: { children: ReactNode }) {
  const { index, pause } = useHero();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) =>
      pause(!entries[0]?.isIntersecting),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pause]);
  return (
    <div
      className="shot"
      id="shot"
      role="tabpanel"
      aria-labelledby={`tag-${index}`}
      ref={ref}
      onMouseEnter={() => pause(true)}
      onMouseLeave={() => pause(false)}
      onFocus={() => pause(true)}
      onBlur={() => pause(false)}
    >
      {children}
    </div>
  );
}
export function HeroDescription() {
  const { index, automatic } = useHero();
  return (
    <p
      className="sr-only"
      id="shot-desc"
      aria-live={automatic ? 'off' : 'polite'}
    >
      {HERO[index]?.desc}
    </p>
  );
}
export function HeroUrl() {
  const { index } = useHero();
  return (
    <span className="shot-url" id="shot-url">
      {HERO[index]?.url}
    </span>
  );
}
export function ShowcasePanel({
  index,
  className,
  children,
}: {
  index: number;
  className: string;
  children: ReactNode;
}) {
  const selected = useHero().index;
  return (
    <div className={`${className}${index === selected ? ' on' : ''}`}>
      {children}
    </div>
  );
}
export function HeroViewport({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const view = ref.current;
    if (!view) return;
    const resize = () =>
      view.style.setProperty(
        '--s',
        Math.min(1, view.clientWidth / 980).toFixed(4),
      );
    const observer = new ResizeObserver(resize);
    observer.observe(view);
    resize();
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const reduce = () =>
      view.querySelectorAll<SVGSVGElement>('svg').forEach((svg) => {
        if (media.matches) svg.pauseAnimations?.();
        else svg.unpauseAnimations?.();
      });
    reduce();
    media.addEventListener('change', reduce);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', reduce);
    };
  }, []);
  return (
    <div className="shot-view" id="shot-view" aria-hidden="true" ref={ref}>
      {children}
    </div>
  );
}
