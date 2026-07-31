import { useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import type { NavItem } from '@/constants/navigation';
import { cn } from '@/utils/cn';

interface DashboardLayoutProps {
  active: string;
  nav: NavItem[];
  userName: string;
  userTitle: string;
  avatarSrc?: string;
  ctaLabel?: string;
  children: React.ReactNode;
}

export function DashboardLayout({
  active,
  nav,
  userName,
  userTitle,
  avatarSrc,
  ctaLabel = 'New Analysis',
  children,
}: DashboardLayoutProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
      <aside className="fixed left-0 top-0 h-full w-[280px] bg-surface-container-low shadow-sm flex flex-col py-6 px-4 z-50">
        <Link to="/" className="flex items-center gap-3 mb-10 px-4">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white">
            <Icon name="medical_services" filled className="text-on-primary-container" />
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
              HealthSphere AI
            </h1>
            <p className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest opacity-70">
              Enterprise Health
            </p>
          </div>
        </Link>

        <nav className="flex-1 space-y-2">
          {nav.map((item) => {
            const activeNow = active === item.key || window.location.pathname === item.href;
            return (
              <NavLink
                key={item.key}
                to={item.href}
                className={cn(
                  'relative flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
                  activeNow
                    ? 'text-primary font-bold bg-primary-container/10'
                    : 'text-on-surface-variant hover:bg-surface-container-high',
                )}
              >
                {activeNow && <div className="sidebar-active-indicator" />}
                <Icon name={item.icon} />
                <span className="font-label-md text-body-md">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={() => navigate('/ai-analysis')}
          className="mt-4 mb-8 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
        >
          <Icon name="add" />
          {ctaLabel}
        </button>

        <div className="pt-6 border-t border-outline-variant/30 space-y-2">
          <Link
            to="/support"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200"
          >
            <Icon name="help" />
            <span className="font-label-md text-body-md">Support</span>
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200"
          >
            <Icon name="logout" />
            <span className="font-label-md text-body-md">Logout</span>
          </button>
        </div>
      </aside>

      <header className="fixed top-0 right-0 left-[280px] h-16 bg-surface/80 backdrop-blur-md flex items-center justify-between px-gutter border-b border-outline-variant/30 z-40">
        <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/30 w-full max-w-md focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Icon name="search" className="text-on-surface-variant mr-2" />
          <input
            ref={searchRef}
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-on-surface-variant/60"
            placeholder="Search patients, reports, or data points..."
            type="text"
          />
          <span className="text-xs text-on-surface-variant/40 ml-2 font-mono">⌘K</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer hover:text-primary transition-colors">
            <Icon name="notifications" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full ring-2 ring-white" />
          </div>
          <Link to="/settings" className="relative cursor-pointer hover:text-primary transition-colors">
            <Icon name="settings" />
          </Link>
          <div className="flex items-center gap-3 pl-6 border-l border-outline-variant/30">
            <div className="text-right">
              <p className="font-bold text-sm leading-none">{userName}</p>
              <p className="text-xs text-on-surface-variant leading-none mt-1">{userTitle}</p>
            </div>
            {avatarSrc ? (
              <img
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10"
                src={avatarSrc}
                alt={userName}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white ring-2 ring-primary/10">
                <Icon name="person" />
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="ml-[280px] pt-16 h-screen overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
