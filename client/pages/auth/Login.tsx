import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { HealthIdModal } from '@/components/auth/HealthIdModal';
import { useAuth } from '@/context/AuthContext';
import { googleLogin, loginWithCredentials, type HealthIdLoginResult } from '@/services/auth.service';
import { DEMO_USERS } from '@/services/demoAuth';
import type { Role } from '@/types/auth';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '';

const ROLE_OPTIONS: Array<{ key: Role; label: string; icon: string }> = [
  { key: 'patient', label: 'Patient', icon: 'person' },
  { key: 'doctor', label: 'Doctor', icon: 'stethoscope' },
  { key: 'admin', label: 'Admin', icon: 'admin_panel_settings' },
];

const DASHBOARD_PREVIEW_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBrFDrDckwH6gl8dAPZDp-5QWkIqlwAtf6oOxfIlyCc22QkqTDubv4hpfYT1o7tPW0O1LP-WBH4c8i1Zi4RBY9zgk6GMVMSGhosazY84kHujII2Ij06eHttSJrwjExFiOXKYOvO3udUgPrhZA0VUA_cRInll-AzU-M2OCtq02L5erHVxFaTCY6KuiwTEgB3ITcUmHaBAgkoQ6aJJ-nxVePbDQVnBF1N3VNQrXUmjuWTemS1uvj9GyuAzg';

export default function Login() {
  const [role, setRole] = useState<Role>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [healthIdOpen, setHealthIdOpen] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleCredential = async (response: { credential: string }) => {
    setError(null);
    setSubmitting(true);
    try {
      const res = await googleLogin(response.credential);
      if (!res.data) throw new Error('Login failed. Please try again.');
      login(res.data.role, res.data.name);
      navigate(`/${res.data.role}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google Sign-In failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !googleButtonRef.current) return;

    let cancelled = false;
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (cancelled || !window.google || !googleButtonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        text: 'continue_with',
        width: googleButtonRef.current.clientWidth || 200,
      });
    };
    document.head.appendChild(script);
    return () => {
      cancelled = true;
      document.head.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const response = await loginWithCredentials(email, password);
      if (!response.data) throw new Error('Login failed. Please try again.');
      login(response.data.role, response.data.name);
      navigate(`/${response.data.role}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen">
      <section className="flex-1 flex flex-col justify-center items-center px-gutter md:px-16 lg:px-24 bg-surface-container-lowest z-10">
        <div className="w-full max-w-[440px] py-12">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
              <Icon name="medical_services" className="text-on-primary-container" filled />
            </div>
            <span className="font-headline-md text-headline-md font-bold text-primary">
              HealthSphere AI
            </span>
          </div>
          <div className="mb-8">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Welcome Back</h1>
            <p className="font-body-md text-on-surface-variant">
              Enter your credentials to access your enterprise dashboard.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label className="font-label-md text-label-md text-outline uppercase">Select Role</label>
              <div className="grid grid-cols-3 gap-3">
                {ROLE_OPTIONS.map((option) => {
                  const selected = role === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => {
                        setRole(option.key);
                        setError(null);
                      }}
                      className={`flex flex-col items-center justify-center py-3 border rounded-xl cursor-pointer transition-all ${
                        selected
                          ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/10'
                          : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
                      }`}
                    >
                      <Icon name={option.icon} className="mb-1" />
                      <span className="font-label-md text-[10px]">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Icon name="mail" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  placeholder="dr.smith@healthsphere.ai"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="password">
                  Password
                </label>
                <Link className="text-primary font-label-md hover:underline" to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[20px]" />
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20"
                defaultChecked
              />
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Remember me for 30 days
              </span>
            </label>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-error/10 border border-error/30 text-error">
                <Icon name="error" className="text-[20px] shrink-0" filled />
                <p className="font-body-sm text-body-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full py-4 font-headline-md text-[18px]"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-on-primary border-t-transparent" />
                  Signing in...
                </>
              ) : (
                'Login to Sphere'
              )}
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30" />
              </div>
              <div className="relative flex justify-center text-label-md uppercase">
                <span className="bg-surface-container-lowest px-4 text-outline">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div ref={googleButtonRef} className="min-h-[52px] flex items-center justify-center">
                {!GOOGLE_CLIENT_ID && (
                  <button
                    type="button"
                    disabled
                    title="Configure VITE_GOOGLE_CLIENT_ID in client/.env to enable Google Sign-In"
                    className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-xl opacity-50 cursor-not-allowed font-body-md"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setHealthIdOpen(true)}
                className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors font-body-md"
              >
                <Icon name="health_and_safety" className="text-[20px] text-primary" />
                HealthID
              </button>
            </div>
          </form>
          <HealthIdModal
            open={healthIdOpen}
            onClose={() => setHealthIdOpen(false)}
            onLogin={(result: HealthIdLoginResult) => {
              login('doctor', result.name);
              navigate('/doctor');
            }}
          />
          <p className="mt-10 text-center font-body-sm text-body-sm text-on-surface-variant">
            Don&apos;t have an account?{' '}
            <Link className="text-primary font-bold hover:underline" to="/register">
              Request enterprise access
            </Link>
          </p>

          <div className="mt-8 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3">
              Demo accounts
            </p>
            <div className="space-y-2">
              {DEMO_USERS.map((user) => (
                <p key={user.email} className="font-body-sm text-body-sm text-on-surface-variant break-all">
                  <span className="font-semibold capitalize text-on-surface">{user.role}</span>{' '}
                  <span className="font-mono">{user.email}</span> / <span className="font-mono">{user.password}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hidden lg:flex flex-1 relative overflow-hidden bg-primary items-center justify-center p-12">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary-container/20 rounded-full ambient-glow" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-tertiary-container/20 rounded-full ambient-glow" />
        <div className="relative z-20 w-full max-w-2xl glass-panel rounded-3xl p-8 shadow-2xl transform hover:scale-[1.01] transition-transform duration-700">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                <img className="w-full h-full object-cover" alt="Medical researcher" src={DASHBOARD_PREVIEW_AVATAR} />
              </div>
              <div>
                <div className="h-4 w-32 bg-white/20 rounded-full mb-2" />
                <div className="h-3 w-20 bg-white/10 rounded-full" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Icon name="notifications" className="text-white text-sm" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Icon name="settings" className="text-white text-sm" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <Icon name="monitoring" className="text-secondary-fixed" />
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                  Active Analysis
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">98.4%</div>
              <div className="text-secondary-fixed text-[12px] flex items-center gap-1">
                <Icon name="trending_up" className="text-[14px]" /> +2.1% confidence
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <Icon name="vital_signs" className="text-primary-fixed" />
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                  Patient Flow
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">1,240</div>
              <div className="text-white/40 text-[12px]">Processed Today</div>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/5 h-48 flex flex-col justify-end gap-3 relative overflow-hidden">
            <div className="absolute inset-0 p-6">
              <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                Global Health Trends
              </span>
            </div>
            <div className="flex items-end gap-2 h-full">
              {[40, 60, 85, 50, 75, 95, 65].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-lg transition-all hover:bg-white/30 ${
                    i === 2 ? 'bg-primary-fixed/40' : i === 5 ? 'bg-secondary-fixed/40' : 'bg-white/10'
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Advanced AI Diagnostics</h2>
            <p className="text-white/60 font-body-md">
              Empowering clinicians with real-time predictive analytics and seamless patient
              management.
            </p>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 text-white/20 font-display-lg text-[64px] font-bold opacity-10 select-none">
          SPHERE
        </div>
      </section>
    </main>
  );
}
