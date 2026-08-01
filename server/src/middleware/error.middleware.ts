import type { Request, Response, NextFunction } from 'express';
import { OtpError } from '../services/otp.service';

export function notFound(_req: Request, res: Response): void {
  res.status(404).json({ success: false, error: 'Endpoint not found.' });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof OtpError) {
    res.status(err.statusCode).json({ success: false, error: err.message });
    return;
  }
  console.error('[healthsphere-ai] Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Internal server error.' });
}
