import type { CSSProperties } from 'react';

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
  weight?: number;
  size?: number | string;
  style?: CSSProperties;
}

export function Icon({
  name,
  className = '',
  filled = false,
  weight = 400,
  size,
  style,
}: IconProps) {
  const variationSettings = `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`;
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined select-none ${className}`}
      style={{ fontVariationSettings: variationSettings, ...(size ? { fontSize: size } : {}), ...style }}
    >
      {name}
    </span>
  );
}
