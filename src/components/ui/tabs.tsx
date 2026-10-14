'use client';

import {
  createContext,
  useContext,
  useState,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react';

const TabContext = createContext<{
  selected: number;
  select: (index: number) => void;
} | null>(null);

function useTabs() {
  const context = useContext(TabContext);
  if (!context)
    throw new Error('Tabs must be rendered inside a Tabs provider.');
  return context;
}

/** Roving focus follows the WAI-ARIA automatic activation tabs pattern. */
export function handleTabKey(
  event: KeyboardEvent<HTMLElement>,
  index: number,
  count: number,
  select: (index: number) => void,
) {
  const keys: Record<string, number> = {
    ArrowRight: (index + 1) % count,
    ArrowDown: (index + 1) % count,
    ArrowLeft: (index - 1 + count) % count,
    ArrowUp: (index - 1 + count) % count,
    Home: 0,
    End: count - 1,
  };
  const next = keys[event.key];
  if (next === undefined || !count) return;
  event.preventDefault();
  select(next);
  const buttons = event.currentTarget
    .closest('[role="tablist"]')
    ?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
  buttons?.[next]?.focus();
}

export function Tabs({ children }: { children: ReactNode }) {
  const [selected, select] = useState(0);
  return (
    <TabContext.Provider value={{ selected, select }}>
      {children}
    </TabContext.Provider>
  );
}

export function Tab({
  index,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { index: number }) {
  const { selected, select } = useTabs();
  return (
    <button
      {...props}
      type="button"
      role="tab"
      aria-selected={selected === index}
      tabIndex={selected === index ? 0 : -1}
      className={`${props.className || ''}${props.className?.includes('step-btn') && index < selected ? ' past' : ''}`}
      onClick={() => select(index)}
      onKeyDown={(event) =>
        handleTabKey(
          event,
          index,
          event.currentTarget
            .closest('[role="tablist"]')
            ?.querySelectorAll('[role="tab"]').length || 0,
          select,
        )
      }
    >
      {children}
    </button>
  );
}

export function TabPanel({
  index,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { index: number }) {
  const { selected } = useTabs();
  return (
    <div {...props} role="tabpanel" hidden={selected !== index}>
      {children}
    </div>
  );
}

export function TabSelectButton({
  index,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { index: number }) {
  const { select } = useTabs();
  return (
    <button
      {...props}
      type="button"
      onClick={() => {
        select(index);
        const tab = document.querySelector<HTMLButtonElement>(`#st-${index}`);
        tab?.focus({ preventScroll: true });
      }}
    >
      {children}
    </button>
  );
}
