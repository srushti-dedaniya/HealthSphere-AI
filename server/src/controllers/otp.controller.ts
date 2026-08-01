import type { Request, Response, NextFunction } from 'express';
import { sendOtp, verifyOtp } from '../services/otp.service';
import { normalizeTarget } from '../validators/otp.validator';
import type { OtpChannel } from '../types/otp';

export async function sendOtpController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { channel, email, mobile } = req.body;
    const target = normalizeTarget(channel, email, mobile);
    const result = await sendOtp(channel as OtpChannel, target);

    res.json({
      success: true,
      message:
        channel === 'email'
          ? 'Verification code sent to your email.'
          : 'Verification code sent to your mobile number.',
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

export function verifyOtpController(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const { channel, email, mobile, code } = req.body;
    const target = normalizeTarget(channel, email, mobile);
    verifyOtp(channel as OtpChannel, target, String(code));

    res.json({
      success: true,
      message:
        channel === 'email'
          ? 'Email verified successfully.'
          : 'Mobile number verified successfully.',
    });
  } catch (err) {
    next(err);
  }
}
