import { Router } from 'express';
import { sendOtpController, verifyOtpController } from '../controllers/otp.controller';
import { validateSendOtp, validateVerifyOtp } from '../validators/otp.validator';
import { validateBody } from '../middleware/validate.middleware';

const router = Router();

router.post('/send', validateBody(validateSendOtp), sendOtpController);
router.post('/verify', validateBody(validateVerifyOtp), verifyOtpController);

export default router;
