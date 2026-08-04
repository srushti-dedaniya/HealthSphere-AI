import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { healthIdRequestOtp, healthIdVerifyOtp, type HealthIdLoginResult } from '@/services/auth.service';

interface HealthIdModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (result: HealthIdLoginResult) => void;
}

export function HealthIdModal({ open, onClose, onLogin }: HealthIdModalProps) {
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [abhaNumber, setAbhaNumber] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [txnId, setTxnId] = useState<string | undefined>();
  const [demo, setDemo] = useState(false);
  const [demoOtp, setDemoOtp] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const close = () => {
    setStep('form');
    setOtp('');
    setTxnId(undefined);
    setDemo(false);
    setDemoOtp(undefined);
    setError(null);
    onClose();
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await healthIdRequestOtp(abhaNumber.trim(), mobile.trim());
      setTxnId(response.data?.txnId);
      setDemo(response.data?.demo ?? false);
      setDemoOtp(response.data?.otp);
      setStep('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to request OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await healthIdVerifyOtp(abhaNumber.trim(), mobile.trim(), otp.trim(), txnId);
      if (!response.data) throw new Error('Login failed. Please try again.');
      onLogin(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-2xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center">
              <Icon name="health_and_safety" className="text-on-primary-container" filled />
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {step === 'form' ? 'Doctor HealthID Login' : 'Verify OTP'}
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {step === 'form'
                  ? 'Sign in using your ABHA / HealthID (NDHM).'
                  : `OTP sent to ${mobile}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
          >
            <Icon name="close" />
          </button>
        </div>

        {step === 'form' ? (
          <form className="space-y-5" onSubmit={handleRequestOtp}>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="abha">
                HealthID / ABHA Number
              </label>
              <div className="relative">
                <Icon name="badge" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
                <input
                  id="abha"
                  type="text"
                  value={abhaNumber}
                  onChange={(e) => {
                    setAbhaNumber(e.target.value);
                    setError(null);
                  }}
                  placeholder="10-1234-5678-9012"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="healthid-mobile">
                Linked Mobile Number
              </label>
              <div className="relative">
                <Icon name="call" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
                <input
                  id="healthid-mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    setError(null);
                  }}
                  placeholder="9876543211"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-error/10 border border-error/30 text-error">
                <Icon name="error" className="text-[20px] shrink-0" filled />
                <p className="font-body-sm text-body-sm">{error}</p>
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-on-primary border-t-transparent" />
              ) : (
                'Send OTP'
              )}
            </Button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handleVerify}>
            {demo && (
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface-variant">
                <p className="font-body-sm text-body-sm">
                  <span className="font-semibold text-on-surface">Demo mode:</span> use OTP{' '}
                  <span className="font-mono font-bold text-primary">{demoOtp}</span> (ABDM is not
                  configured yet).
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="healthid-otp">
                OTP
              </label>
              <div className="relative">
                <Icon name="pin" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
                <input
                  id="healthid-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setError(null);
                  }}
                  placeholder="••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-error/10 border border-error/30 text-error">
                <Icon name="error" className="text-[20px] shrink-0" filled />
                <p className="font-body-sm text-body-sm">{error}</p>
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-on-primary border-t-transparent" />
              ) : (
                'Verify & Login'
              )}
            </Button>
            <button
              type="button"
              onClick={() => {
                setStep('form');
                setError(null);
              }}
              className="w-full text-center font-label-md text-label-md text-primary hover:underline"
            >
              Change HealthID / mobile
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
