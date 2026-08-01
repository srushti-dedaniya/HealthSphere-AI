import { env } from '../config/env';
import type { OtpDeliveryResult } from '../types/otp';

const TWILIO_API = 'https://api.twilio.com/2010-04-01';

export async function sendMobileOtp(mobile: string, code: string): Promise<OtpDeliveryResult> {
  const { provider, twilioAccountSid, twilioAuthToken, twilioPhoneFrom } = env.sms;

  if (provider === 'twilio' && twilioAccountSid && twilioAuthToken && twilioPhoneFrom) {
    const auth = Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString('base64');
    const body = new URLSearchParams({
      From: twilioPhoneFrom,
      To: `+91${mobile}`,
      Body: `Your HealthSphere AI verification code is ${code}. It is valid for ${Math.round(env.otp.ttlSeconds / 60)} minutes.`,
    });

    const response = await fetch(`${TWILIO_API}/Accounts/${twilioAccountSid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`SMS delivery failed (${response.status})`);
    }

    return { demo: false };
  }

  console.log(`[sms:demo] OTP for +91${mobile}: ${code}`);
  return { demo: true, otp: code };
}
