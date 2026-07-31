import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';

interface LogoProps {
  to?: string;
  icon?: string;
  subtitle?: string;
}

export function Logo({ to = '/', icon = 'medical_services', subtitle }: LogoProps) {
  const inner = (
    <>
      <div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center">
        <Icon name={icon} className="text-on-primary-container text-[20px]" filled />
      </div>
      <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
        HealthSphere AI
      </span>
    </>
  );

  return (
    <div className="flex items-center gap-2">
      <Link to={to} className="flex items-center gap-2">
        {inner}
      </Link>
      {subtitle && (
        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
          {subtitle}
        </p>
      )}
    </div>
  );
}
