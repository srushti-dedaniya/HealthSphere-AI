import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'ai' | 'outline' | 'ghost' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 font-headline-md font-medium rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary/90 shadow-lg shadow-primary/10 active:scale-[0.98]',
  ai: 'ai-action-btn text-on-primary shadow-lg active:scale-[0.98]',
  secondary: 'bg-secondary text-on-secondary hover:bg-secondary/90 active:scale-[0.98]',
  outline: 'border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all',
  ghost: 'text-on-surface-variant hover:text-primary transition-colors',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-label-md',
  md: 'px-6 py-2.5 text-body-md',
  lg: 'px-8 py-4 text-headline-md',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
