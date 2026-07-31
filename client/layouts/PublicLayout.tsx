import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export function PublicLayout() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    ['#features', 'Features'],
    ['#demo', 'AI Insights'],
    ['#stats', 'Impact'],
    ['#about', 'Company'],
  ] as const;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <header className="fixed top-0 left-0 w-full z-50 h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 flex items-center px-container-padding">
        <div className="max-w-[1440px] w-full mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center">
              <Icon name="medical_services" className="text-on-primary-container text-[20px]" filled />
            </div>
            <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
              HealthSphere AI
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(([href, label]) => (
              <a
                key={href}
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href={href}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button variant="ai" size="sm" onClick={() => navigate(`/${user?.role}`)}>
                Open Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="ai" size="sm" onClick={() => navigate('/register')}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}
