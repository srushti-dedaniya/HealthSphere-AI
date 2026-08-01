import type { OtpRecord, OtpChannel } from '../types/otp';

const store = new Map<string, OtpRecord>();

export function keyFor(channel: OtpChannel, target: string): string {
  return `${channel}:${target}`;
}

export function saveOtp(key: string, code: string, ttlSeconds: number): void {
  store.set(key, {
    code,
    expiresAt: Date.now() + ttlSeconds * 1000,
    createdAt: Date.now(),
    attempts: 0,
    verified: false,
  });
}

export function getOtp(key: string): OtpRecord | undefined {
  const record = store.get(key);
  if (!record) return undefined;
  if (Date.now() > record.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return record;
}

export function bumpAttempts(key: string): void {
  const record = store.get(key);
  if (record) record.attempts += 1;
}

export function markVerified(key: string): void {
  const record = store.get(key);
  if (record) record.verified = true;
}

export function deleteOtp(key: string): void {
  store.delete(key);
}

export function lastSentAt(key: string): number | undefined {
  const record = store.get(key);
  return record ? record.createdAt : undefined;
}

export function cleanupExpired(): void {
  const now = Date.now();
  for (const [key, record] of store) {
    if (now > record.expiresAt) store.delete(key);
  }
}
