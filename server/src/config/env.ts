import 'dotenv/config';

function int(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  port: int(process.env.PORT, 4000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
  otp: {
    ttlSeconds: int(process.env.OTP_TTL_SECONDS, 600),
    resendCooldownSeconds: int(process.env.OTP_RESEND_COOLDOWN_SECONDS, 30),
    maxAttempts: int(process.env.OTP_MAX_ATTEMPTS, 5),
  },
  smtp: {
    host: process.env.SMTP_HOST ?? '',
    port: int(process.env.SMTP_PORT, 587),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
    from: process.env.EMAIL_FROM ?? 'HealthSphere AI <no-reply@healthsphere.ai>',
  },
  sms: {
    provider: process.env.SMS_PROVIDER ?? '',
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID ?? '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN ?? '',
    twilioPhoneFrom: process.env.TWILIO_PHONE_FROM ?? '',
  },
};
