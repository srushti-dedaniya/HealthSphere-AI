import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import {
  sendEmailOtp,
  sendMobileOtp,
  verifyEmailOtp,
  verifyMobileOtp,
  type OtpChannel,
} from '@/services/auth.service';

interface OtpVerificationProps {
  email: string;
  mobile: string;
  onVerified: () => void;
}

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

function OtpCard({
  channel,
  target,
  onVerified,
}: {
  channel: OtpChannel;
  target: string;
  onVerified: () => void;
}) {
  const [otp, setOtp] = useState('');
  const [demoOtp, setDemoOtp] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [done, setDone] = useState(false);

  const isEmail = channel === 'email';
  const send = isEmail ? sendEmailOtp : sendMobileOtp;
  const verify = isEmail ? verifyEmailOtp : verifyMobileOtp;

  useEffect(() => {
    setResendIn(RESEND_SECONDS);
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [resendIn]);

  const sendOtp = async () => {
    setSending(true);
    setError(null);
    setDemoOtp(null);
    try {
      const response = await send(target);
      if (response.demo && response.otp) setDemoOtp(response.otp);
      setResendIn(RESEND_SECONDS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the verification code.');
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    void sendOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyCode = async () => {
    if (otp.length !== OTP_LENGTH) {
      setError(`Enter the ${OTP_LENGTH}-digit code sent to your ${isEmail ? 'email' : 'mobile number'}.`);
      return;
    }
    setVerifying(true);
    setError(null);
    try {
      await verify(target, otp);
      setDone(true);
      onVerified();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const input = (
    <input
      className="w-full text-center text-2xl font-bold tracking-[0.5em] bg-surface-container-low border rounded-xl px-4 py-4 text-on-surface focus:bg-white transition-all focus:outline-none disabled:bg-surface-container-low"
      type="text"
      inputMode="numeric"
      maxLength={OTP_LENGTH}
      value={otp}
      disabled={done}
      placeholder="• • • • • •"
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH);
        setOtp(value);
        setError(null);
      }}
    />
  );

  return (
    <div
      className={`bg-surface-container-lowest rounded-xl border p-card-padding transition-all ${
        done ? 'border-secondary/40' : error ? 'border-error/40' : 'border-outline-variant/30'
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center ${
              done ? 'bg-secondary/10 text-secondary' : 'bg-primary/5 text-primary'
            }`}
          >
            <Icon name={done ? 'check_circle' : isEmail ? 'mail' : 'phone_iphone'} className="text-xl" />
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              {isEmail ? 'Email Verification' : 'Mobile Verification'}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant break-all">
              Code sent to <span className="font-semibold text-on-surface">{isEmail ? target : `+91 ${target}`}</span>
            </p>
          </div>
        </div>
        {done && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-md text-label-md">
            <Icon name="verified" className="text-sm" />
            Verified
          </span>
        )}
      </div>

      {sending ? (
        <div className="py-4 flex items-center gap-2 text-on-surface-variant">
          <span className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />
          <span className="font-body-sm text-body-sm">Sending verification code...</span>
        </div>
      ) : (
        <>
          {demoOtp && !done && (
            <div className="mb-6 flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10 text-primary">
              <Icon name="info" className="text-lg shrink-0" filled />
              <p className="font-body-sm text-body-sm">
                Demo mode: no SMS/email service is connected, so your verification code is{' '}
                <span className="font-mono font-bold tracking-widest">{demoOtp}</span>
              </p>
            </div>
          )}

          {done ? (
            <div className="flex items-center gap-2 text-secondary">
              <Icon name="lock_open" />
              <span className="font-body-md text-body-md">
                Your {isEmail ? 'email address' : 'mobile number'} has been verified successfully.
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              {input}
              {error && (
                <p className="text-error text-body-sm font-body-sm flex items-center gap-1">
                  <Icon name="error" className="text-[16px]" />
                  {error}
                </p>
              )}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={resendIn > 0 || sending}
                  className="text-primary font-label-md hover:underline disabled:text-outline disabled:hover:no-underline disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <Icon name="refresh" className="text-[16px]" />
                  {resendIn > 0 ? `Resend code in ${resendIn}s` : 'Resend code'}
                </button>
                <button
                  type="button"
                  onClick={verifyCode}
                  disabled={verifying || otp.length !== OTP_LENGTH}
                  className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {verifying ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-on-primary border-t-transparent" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Code
                      <Icon name="verified_user" className="text-sm" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function OtpVerification({ email, mobile, onVerified }: OtpVerificationProps) {
  const [verified, setVerified] = useState<Record<OtpChannel, boolean>>({
    email: false,
    mobile: false,
  });

  const markVerified = (channel: OtpChannel) => {
    setVerified((prev) => ({ ...prev, [channel]: true }));
  };

  const allVerified = verified.email && verified.mobile;

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-8 flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
        <Icon name="shield_check" className="text-primary shrink-0" filled />
        <p className="font-body-sm text-body-sm text-primary">
          We have sent one-time passwords to your email and mobile number. Verify both to confirm
          your account. Codes expire in 10 minutes.
        </p>
      </div>

      <div className="space-y-6">
        <OtpCard channel="email" target={email} onVerified={() => markVerified('email')} />
        <OtpCard channel="mobile" target={mobile} onVerified={() => markVerified('mobile')} />
      </div>

      <div className="pt-10 flex flex-col sm:flex-row items-center gap-4">
        <button
          type="button"
          disabled={!allVerified}
          onClick={onVerified}
          className="flex-1 w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {allVerified ? (
            <>
              Confirm & Create Account
              <Icon name="arrow_forward" />
            </>
          ) : (
            <>
              Verify both to continue
              <Icon name="lock" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
