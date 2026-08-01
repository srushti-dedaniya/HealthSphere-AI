import { env } from '../config/env';
import { generateOtp } from '../utils/otp';
import {
  keyFor,
  saveOtp,
  getOtp,
  bumpAttempts,
  markVerified,
  deleteOtp,
  lastSentAt,
} from './otp.store';
import { sendEmailOtp } from './email.service';
import { sendMobileOtp } from './sms.service';
import type { OtpChannel, OtpDeliveryResult } from '../types/otp';

export class OtpError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 400,
  ) {
    super(message);
    this.name = 'OtpError';
  }
}

export async function sendOtp(channel: OtpChannel, target: string): Promise<OtpDeliveryResult> {
  const key = keyFor(channel, target);
  const lastSent = lastSentAt(key);
  if (lastSent) {
    const cooldownMs = env.otp.resendCooldownSeconds * 1000;
    const remaining = Math.ceil((lastSent + cooldownMs - Date.now()) / 1000);
    if (remaining > 0) {
      throw new OtpError(`Please wait ${remaining}s before requesting a new code.`, 429);
    }
  }

  const code = generateOtp(6);
  saveOtp(key, code, env.otp.ttlSeconds);

  if (channel === 'email') return sendEmailOtp(target, code);
  return sendMobileOtp(target, code);
}

export function verifyOtp(channel: OtpChannel, target: string, code: string): void {
  const key = keyFor(channel, target);
  const record = getOtp(key);

  if (!record) {
    throw new OtpError('No code was requested for this contact. Request a new code.');
  }
  if (record.verified) {
    throw new OtpError('This code has already been verified.');
  }
  if (record.attempts >= env.otp.maxAttempts) {
    deleteOtp(key);
    throw new OtpError('Too many incorrect attempts. Request a new code.');
  }
  if (record.code !== code) {
    bumpAttempts(key);
    throw new OtpError('Incorrect code. Please check and try again.');
  }

  markVerified(key);
}
