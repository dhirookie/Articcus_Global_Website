import type { CSSProperties } from 'react';

type Style = CSSProperties & { [key: `--${string}`]: string | number };

/** Allows typed CSS custom properties alongside ordinary React styles. */
export function css(style: Style): CSSProperties {
  return style;
}
