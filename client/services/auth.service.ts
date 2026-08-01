export type OtpChannel = 'email' | 'mobile';

export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean;
  message?: string;
  error?: string;
  demo?: boolean;
  otp?: string;
  data?: T;
}

export interface OtpDelivery extends Record<string, unknown> {
  demo: boolean;
  otp?: string;
}

class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, body: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError('Could not reach the verification service. Please check your connection and try again.', 0);
  }

  let payload: ApiResponse<T>;
  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new ApiError('The verification service returned an invalid response.', response.status);
  }

  if (!response.ok || !payload.success) {
    throw new ApiError(payload.error ?? 'Something went wrong. Please try again.', response.status);
  }

  return payload as T;
}

export function sendEmailOtp(email: string): Promise<ApiResponse<OtpDelivery>> {
  return request('/api/otp/send', { channel: 'email', email });
}

export function sendMobileOtp(mobile: string): Promise<ApiResponse<OtpDelivery>> {
  return request('/api/otp/send', { channel: 'mobile', mobile });
}

export function verifyEmailOtp(email: string, code: string): Promise<ApiResponse> {
  return request('/api/otp/verify', { channel: 'email', email, code });
}

export function verifyMobileOtp(mobile: string, code: string): Promise<ApiResponse> {
  return request('/api/otp/verify', { channel: 'mobile', mobile, code });
}
