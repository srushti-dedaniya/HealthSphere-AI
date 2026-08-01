import nodemailer from 'nodemailer';
import { env } from '../config/env';
import type { OtpDeliveryResult } from '../types/otp';

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (!env.smtp.host || !env.smtp.user) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth: { user: env.smtp.user, pass: env.smtp.pass },
    });
  }
  return transporter;
}

export async function sendEmailOtp(email: string, code: string): Promise<OtpDeliveryResult> {
  const transport = getTransporter();

  if (!transport) {
    console.log(`[email:demo] OTP for ${email}: ${code}`);
    return { demo: true, otp: code };
  }

  const ttlMinutes = Math.round(env.otp.ttlSeconds / 60);
  await transport.sendMail({
    from: env.smtp.from,
    to: email,
    subject: 'Your HealthSphere AI verification code',
    text: `Your HealthSphere AI verification code is ${code}. It is valid for ${ttlMinutes} minutes. If you did not request this code, you can safely ignore this email.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
        <h2 style="margin:0 0 8px;color:#1a237e">HealthSphere AI</h2>
        <p style="color:#4b5563">Your verification code is:</p>
        <div style="font-size:28px;font-weight:700;letter-spacing:8px;color:#1a237e;margin:16px 0">${code}</div>
        <p style="color:#6b7280;font-size:14px">This code is valid for ${ttlMinutes} minutes. If you did not request it, you can safely ignore this email.</p>
      </div>`,
  });

  return { demo: false };
}
