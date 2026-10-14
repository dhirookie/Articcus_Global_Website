'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { getService, type ServiceId } from '@/data/catalogue';
import {
  EMPTY_BRIEF,
  readBrief,
  writeBrief,
  type BriefState,
} from './brief-storage';

interface BriefContext extends BriefState {
  toggle: (id: ServiceId) => void;
  add: (ids: readonly ServiceId[], industry?: BriefState['industry']) => void;
  setIndustry: (industry: BriefState['industry']) => void;
  clear: () => void;
  notify: (message: string) => void;
}
const Context = createContext<BriefContext | null>(null);

export function useBrief() {
  const value = useContext(Context);
  if (!value)
    throw new Error('Brief components must be rendered inside BriefProvider.');
  return value;
}

export function BriefProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [brief, setBrief] = useState<BriefState>(EMPTY_BRIEF);
  const [toast, setToast] = useState('');
  const [ready, setReady] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    // Read only after hydration so SSR and the first browser render agree.
    const stored = readBrief();
    const task = setTimeout(() => {
      setBrief(stored);
      setReady(true);
    }, 0);
    return () => clearTimeout(task);
  }, []);
  useEffect(() => {
    if (ready) writeBrief(brief);
  }, [brief, ready]);
  useEffect(() => () => clearTimeout(timer.current), []);
  function notify(message: string) {
    clearTimeout(timer.current);
    setToast(message);
    timer.current = setTimeout(() => setToast(''), 2800);
  }
  const value: BriefContext = {
    ...brief,
    notify,
    toggle(id) {
      const selected = brief.services.includes(id);
      setBrief((current) => ({
        ...current,
        services: current.services.includes(id)
          ? current.services.filter((item) => item !== id)
          : [...current.services, id],
      }));
      notify(
        `${selected ? 'Removed' : 'Added'} ${getService(id).name} ${selected ? 'from' : 'to'} your brief`,
      );
    },
    add(ids, industry) {
      setBrief((current) => ({
        services: [...new Set([...current.services, ...ids])],
        industry: industry || current.industry,
      }));
    },
    setIndustry(industry) {
      setBrief((current) => ({ ...current, industry }));
    },
    clear() {
      setBrief({ services: [], industry: '' });
    },
  };
  return (
    <Context.Provider value={value}>
      {children}
      <Link
        className="brief-pill"
        id="brief-pill"
        href="/contact#start"
        hidden={!brief.services.length || pathname === '/contact'}
        aria-label={`Review your brief, ${brief.services.length} services`}
      >
        Your brief
        <span className="count" id="pill-count">
          {brief.services.length}
        </span>
      </Link>
      <div
        className={`toast${toast ? ' show' : ''}`}
        id="toast"
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </Context.Provider>
  );
}
