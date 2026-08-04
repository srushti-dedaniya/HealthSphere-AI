import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../services/prisma';
import { verifyPassword } from '../utils/password';
import { ApiError } from '../utils/errors';
import { verifyGoogleIdToken } from '../services/google.service';
import { canonicalizeAbhaNumber, requestAbhaOtp, verifyAbhaOtp } from '../services/ndhm.service';

type Account = {
  id: number;
  fullName: string;
  email: string;
  password: string;
};

function roleFor(patient: unknown, doctor: unknown): 'patient' | 'doctor' | 'admin' {
  if (patient) return 'patient';
  if (doctor) return 'doctor';
  return 'admin';
}

async function findByEmail(email: string): Promise<{ account: Account; role: 'patient' | 'doctor' | 'admin' } | null> {
  const patient = await prisma.patient.findUnique({ where: { email } });
  const doctor = patient ? null : await prisma.doctor.findUnique({ where: { email } });
  const owner = patient || doctor ? null : await prisma.owner.findUnique({ where: { email } });

  const account = (patient ?? doctor ?? owner) as Account | null;
  if (!account) return null;
  return { account, role: roleFor(patient, doctor) };
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    const normalizedEmail = String(email).trim().toLowerCase();

    const result = await findByEmail(normalizedEmail);
    if (!result) {
      throw new ApiError('No account is registered with this email. Please register first.', 401);
    }

    const { account, role } = result;
    const valid = await verifyPassword(String(password), account.password);
    if (!valid) {
      throw new ApiError('Incorrect password. Please check and try again.', 401);
    }

    res.json({
      success: true,
      data: {
        id: account.id,
        name: account.fullName,
        email: account.email,
        role,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function googleLoginController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { token } = req.body as { token?: string };

    const profile = await verifyGoogleIdToken(String(token));
    const result = await findByEmail(profile.email);

    if (!result) {
      throw new ApiError(
        'No account is registered with this Google email. Please register with your email and password first.',
        401,
      );
    }

    const { account, role } = result;
    res.json({
      success: true,
      data: {
        id: account.id,
        name: account.fullName,
        email: account.email,
        role,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function healthIdRequestOtpController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { abhaNumber, mobile } = req.body as { abhaNumber?: string; mobile?: string };
    const healthId = canonicalizeAbhaNumber(String(abhaNumber));

    const doctor = await prisma.doctor.findUnique({ where: { healthId } });
    if (!doctor) {
      throw new ApiError(
        'No doctor account is linked to this HealthID. Please contact your administrator.',
        401,
      );
    }

    const delivery = await requestAbhaOtp(String(mobile));
    res.json({
      success: true,
      demo: delivery.demo,
      txnId: delivery.txnId,
      otp: delivery.otp,
    });
  } catch (err) {
    next(err);
  }
}

export async function healthIdVerifyController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { abhaNumber, mobile, otp, txnId } = req.body as {
      abhaNumber?: string;
      mobile?: string;
      otp?: string;
      txnId?: string;
    };
    const healthId = canonicalizeAbhaNumber(String(abhaNumber));

    const { abhaNumber: verifiedAbha, name: abdmName } = await verifyAbhaOtp({
      mobile: String(mobile),
      otp: String(otp),
      txnId,
      expectedAbhaNumber: healthId,
    });

    const doctor = await prisma.doctor.findUnique({ where: { healthId: verifiedAbha } });
    if (!doctor) {
      throw new ApiError('No doctor account is linked to this HealthID.', 401);
    }

    res.json({
      success: true,
      data: {
        id: doctor.id,
        name: doctor.fullName,
        email: doctor.email,
        role: 'doctor',
        abhaNumber: verifiedAbha,
        abdmName: abdmName || undefined,
      },
    });
  } catch (err) {
    next(err);
  }
}
