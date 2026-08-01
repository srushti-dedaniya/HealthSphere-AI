import { isValidIndianMobile, normalizeMobile } from '../utils/otp';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeTarget(channel: string, email?: string, mobile?: string): string {
  if (channel === 'email') return String(email).trim().toLowerCase();
  return normalizeMobile(String(mobile));
}

export function validateSendOtp(body: unknown): string | null {
  if (!body || typeof body !== 'object') return 'Request body is required.';

  const { channel, email, mobile } = body as { channel?: string; email?: string; mobile?: string };

  if (channel === 'email') {
    if (!email || !EMAIL_PATTERN.test(String(email))) return 'Enter a valid email address.';
    return null;
  }
  if (channel === 'mobile') {
    if (!mobile || !isValidIndianMobile(String(mobile)))
      return 'Enter a valid 10-digit mobile number.';
    return null;
  }
  return 'Invalid verification channel.';
}

export function validateVerifyOtp(body: unknown): string | null {
  if (!body || typeof body !== 'object') return 'Request body is required.';

  const { channel, email, mobile, code } = body as {
    channel?: string;
    email?: string;
    mobile?: string;
    code?: string;
  };

  if (!code || !/^\d{6}$/.test(String(code))) return 'Enter the 6-digit verification code.';

  if (channel === 'email') {
    if (!email || !EMAIL_PATTERN.test(String(email))) return 'Enter a valid email address.';
    return null;
  }
  if (channel === 'mobile') {
    if (!mobile || !isValidIndianMobile(String(mobile)))
      return 'Enter a valid 10-digit mobile number.';
    return null;
  }
  return 'Invalid verification channel.';
}
