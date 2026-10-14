'use client';

import type { ButtonHTMLAttributes } from 'react';
import { useBrief } from '@/features/brief/brief-provider';

export function CopyButton({
  text,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { text: string }) {
  const { notify } = useBrief();
  return (
    <button
      {...props}
      type="button"
      onClick={async (event) => {
        const button = event.currentTarget;
        try {
          await navigator.clipboard.writeText(text);
          notify(`Copied ${text}`);
        } catch {
          const target = button.closest('.c-row')?.querySelector('a, .c-val');
          const selection = window.getSelection();
          if (target && selection) {
            const range = document.createRange();
            range.selectNodeContents(target);
            selection.removeAllRanges();
            selection.addRange(range);
          }
          notify('Selected. Press Ctrl+C or Cmd+C to copy.');
        }
      }}
    >
      {children}
    </button>
  );
}
