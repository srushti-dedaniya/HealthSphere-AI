export type OtpChannel = 'email' | 'mobile';

export interface OtpRecord {
  code: string;
  expiresAt: number;
  createdAt: number;
  attempts: number;
  verified: boolean;
}

export interface OtpDeliveryResult {
  demo: boolean;
  otp?: string;
}
