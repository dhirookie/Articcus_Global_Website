import type { SVGProps } from 'react';

export function Icon({
  name,
  className = 'ic',
  ...props
}: SVGProps<SVGSVGElement> & { name: string }) {
  return (
    <svg className={className} aria-hidden="true" {...props}>
      <use href={`#i-${name}`} />
    </svg>
  );
}

export function Logo() {
  return (
    <svg
      className="logo"
      viewBox="0 0 2225 551"
      role="img"
      aria-label="Articcus"
    >
      <use href="#logo" />
    </svg>
  );
}
