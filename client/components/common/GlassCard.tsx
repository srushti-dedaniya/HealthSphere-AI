import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface GlassCardProps {
  children?: ReactNode;
  className?: string;
  interactive?: boolean;
}

export function GlassCard({ children, className, interactive = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-3xl',
        interactive && 'card-lift hover:-translate-y-1',
        className,
      )}
    >
      {children}
    </div>
  );
}
