import { app } from './app';
import { env } from './config/env';
import { cleanupExpired } from './services/otp.store';

app.listen(env.port, () => {
  console.log(`[healthsphere-ai] API running on http://localhost:${env.port}`);

  const smtpConfigured = Boolean(env.smtp.host && env.smtp.user);
  const smsConfigured = env.sms.provider === 'twilio' && Boolean(env.sms.twilioAccountSid);
  if (!smtpConfigured && !smsConfigured) {
    console.log(
      '[healthsphere-ai] No email/SMS provider configured — demo mode: OTPs are logged to the console and returned to the client.',
    );
  }
});

setInterval(cleanupExpired, 60 * 60 * 1000).unref();
