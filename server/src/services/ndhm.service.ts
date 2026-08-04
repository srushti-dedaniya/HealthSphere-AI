import { env } from '../config/env';
import { ApiError } from '../utils/errors';

const DEMO_OTP = '123456';

export function canonicalizeAbhaNumber(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 14) {
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}-${digits.slice(10, 14)}`;
  }
  return input.trim();
}

interface FacilitySession {
  accessToken: string;
  expiresAt: number;
}

let facilitySession: FacilitySession | null = null;

export function isAbdmConfigured(): boolean {
  return Boolean(env.abdm.clientId && env.abdm.clientSecret && env.abdm.baseUrl);
}

function baseUrl(): string {
  return env.abdm.baseUrl.replace(/\/$/, '');
}

async function fetchJson(url: string, init: RequestInit): Promise<{ body: unknown; headers: Headers }> {
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch {
    throw new ApiError('Could not reach the ABDM/HealthID service. Please try again later.', 502);
  }

  const text = await response.text();
  let body: unknown = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }

  if (!response.ok) {
    const detail = (body as { message?: string; details?: string }).message;
    throw new ApiError(detail ? `ABDM error: ${detail}` : 'ABDM/HealthID verification failed.', 502);
  }

  return { body, headers: response.headers };
}

async function getFacilityToken(): Promise<string> {
  if (facilitySession && facilitySession.expiresAt > Date.now() + 30_000) {
    return facilitySession.accessToken;
  }

  const { body, headers } = await fetchJson(`${baseUrl()}/v1/auth/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientId: env.abdm.clientId,
      clientSecret: env.abdm.clientSecret,
      grantType: 'client_credentials',
    }),
  });

  const token = headers.get('x-token') ?? (body as { accessToken?: string }).accessToken;
  if (!token) {
    throw new ApiError('ABDM session could not be established.', 502);
  }

  facilitySession = {
    accessToken: token,
    expiresAt: Date.now() + 50 * 60 * 1000,
  };
  return token;
}

export async function requestAbhaOtp(mobile: string): Promise<{ demo: boolean; txnId?: string; otp?: string }> {
  if (!isAbdmConfigured()) {
    return { demo: true, txnId: 'demo', otp: DEMO_OTP };
  }

  const facilityToken = await getFacilityToken();
  const { body } = await fetchJson(`${baseUrl()}/v1/abha/phone/generateOtp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CM-ID': env.abdm.facilityId || 'abdm',
      'X-Token': facilityToken,
    },
    body: JSON.stringify({ mobile }),
  });

  const txnId = (body as { txnId?: string }).txnId;
  if (!txnId) {
    throw new ApiError('ABDM did not return a transaction ID.', 502);
  }
  return { demo: false, txnId };
}

export async function verifyAbhaOtp(args: {
  mobile: string;
  otp: string;
  txnId?: string;
  expectedAbhaNumber: string;
}): Promise<{ abhaNumber: string; name: string }> {
  if (!isAbdmConfigured()) {
    if (args.otp !== DEMO_OTP) {
      throw new ApiError('Incorrect OTP. Please check and try again.', 401);
    }
    return { abhaNumber: args.expectedAbhaNumber, name: '' };
  }

  const facilityToken = await getFacilityToken();
  const { headers } = await fetchJson(`${baseUrl()}/v1/abha/phone/verifyOtp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CM-ID': env.abdm.facilityId || 'abdm',
      'X-Token': facilityToken,
    },
    body: JSON.stringify({
      mobile: args.mobile,
      otp: args.otp,
      txnId: args.txnId ?? '',
    }),
  });

  const patientToken = headers.get('x-token');
  if (!patientToken) {
    throw new ApiError('ABDM did not return a patient session.', 502);
  }

  const { body } = await fetchJson(`${baseUrl()}/v1/abha/profile`, {
    method: 'GET',
    headers: {
      'X-CM-ID': env.abdm.facilityId || 'abdm',
      'X-Token': patientToken,
    },
  });

  const profile = body as {
    abhaNumber?: string;
    name?: { first?: string; middle?: string; last?: string };
  };

  const abhaNumber = profile.abhaNumber;
  if (!abhaNumber) {
    throw new ApiError('ABDM profile did not include an ABHA number.', 502);
  }

  const first = profile.name?.first ?? '';
  const middle = profile.name?.middle ?? '';
  const last = profile.name?.last ?? '';
  const name = [first, middle, last].filter(Boolean).join(' ').trim();

  return { abhaNumber, name };
}
