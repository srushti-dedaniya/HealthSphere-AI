import { createRemoteJWKSet, jwtVerify } from 'jose';
import { env } from '../config/env';
import { ApiError } from '../utils/errors';

const GOOGLE_JWKS_URL = 'https://www.googleapis.com/oauth2/v3/certs';
const googleJwks = createRemoteJWKSet(new URL(GOOGLE_JWKS_URL));

export interface GoogleProfile {
  email: string;
  name: string;
  picture?: string;
}

export function isGoogleConfigured(): boolean {
  return Boolean(env.google.clientId);
}

export async function verifyGoogleIdToken(token: string): Promise<GoogleProfile> {
  if (!env.google.clientId) {
    throw new ApiError('Google Sign-In is not configured on the server.', 503);
  }

  let payload: Awaited<ReturnType<typeof jwtVerify>>['payload'];
  try {
    const result = await jwtVerify(token, googleJwks, {
      audience: env.google.clientId,
      algorithms: ['RS256'],
    });
    payload = result.payload;
  } catch {
    throw new ApiError('Google Sign-In failed. Please try again.', 401);
  }

  if (typeof payload.email !== 'string' || !payload.email) {
    throw new ApiError('Your Google account has no email address associated with it.', 401);
  }

  return {
    email: payload.email.toLowerCase(),
    name: typeof payload.name === 'string' ? payload.name : payload.email.toLowerCase(),
    picture: typeof payload.picture === 'string' ? payload.picture : undefined,
  };
}
