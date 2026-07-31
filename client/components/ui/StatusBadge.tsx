import { cn } from '@/utils/cn';

type Tone = 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral' | 'warning';

interface StatusBadgeProps {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}

const tones: Record<Tone, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  tertiary: 'bg-tertiary/10 text-tertiary',
  error: 'bg-error/10 text-error',
  warning: 'bg-amber-500/10 text-amber-600',
  neutral: 'bg-surface-container-high text-on-surface-variant',
};

export function StatusBadge({ children, tone = 'neutral', className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
