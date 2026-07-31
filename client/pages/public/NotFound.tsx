import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center px-gutter text-center">
      <div className="w-20 h-20 bg-primary-fixed rounded-3xl flex items-center justify-center mb-8">
        <Icon name="medical_services" className="text-primary text-4xl" />
      </div>
      <h1 className="font-display-lg text-display-lg text-primary">404</h1>
      <p className="font-headline-md text-headline-md text-on-surface mt-2">
        This page is not in our records
      </p>
      <p className="font-body-md text-body-md text-on-surface-variant mt-4 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to a
        healthy place.
      </p>
      <div className="mt-8">
        <Button variant="ai" size="lg" onClick={() => navigate('/')}>
          <Icon name="arrow_back" /> Back to Home
        </Button>
      </div>
    </div>
  );
}
