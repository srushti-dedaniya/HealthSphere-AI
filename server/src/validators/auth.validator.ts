const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const ABHA_PATTERN = /^(\d{2}-\d{4}-\d{4}-\d{4}|\d{14})$/;
const OTP_PATTERN = /^\d{6}$/;

export function validateLogin(body: unknown): string | null {
  if (!body || typeof body !== 'object') return 'Request body is required.';

  const { email, password } = body as { email?: string; password?: string };

  if (!email || !EMAIL_PATTERN.test(String(email))) return 'Enter a valid email address.';
  if (!password || String(password).length < 6)
    return 'Password must be at least 6 characters long.';
  return null;
}

export function validateGoogleLogin(body: unknown): string | null {
  if (!body || typeof body !== 'object') return 'Request body is required.';

  const { token } = body as { token?: string };

  if (!token || typeof token !== 'string' || token.length < 20)
    return 'Invalid Google credential.';
  return null;
}

export function validateHealthIdRequestOtp(body: unknown): string | null {
  if (!body || typeof body !== 'object') return 'Request body is required.';

  const { abhaNumber, mobile } = body as { abhaNumber?: string; mobile?: string };

  if (!abhaNumber || !ABHA_PATTERN.test(String(abhaNumber).trim()))
    return 'Enter a valid HealthID (ABHA number), e.g. 10-1234-5678-9012.';
  if (!mobile || !MOBILE_PATTERN.test(String(mobile)))
    return 'Enter a valid 10-digit mobile number.';
  return null;
}

export function validateHealthIdVerify(body: unknown): string | null {
  if (!body || typeof body !== 'object') return 'Request body is required.';

  const { abhaNumber, mobile, otp, txnId } = body as {
    abhaNumber?: string;
    mobile?: string;
    otp?: string;
    txnId?: string;
  };

  if (!abhaNumber || !ABHA_PATTERN.test(String(abhaNumber).trim()))
    return 'Enter a valid HealthID (ABHA number), e.g. 10-1234-5678-9012.';
  if (!mobile || !MOBILE_PATTERN.test(String(mobile)))
    return 'Enter a valid 10-digit mobile number.';
  if (!otp || !OTP_PATTERN.test(String(otp))) return 'Enter the 6-digit OTP.';
  if (txnId && typeof txnId !== 'string') return 'Invalid OTP session.';
  return null;
}
