import { Router } from 'express';
import {
  loginController,
  googleLoginController,
  healthIdRequestOtpController,
  healthIdVerifyController,
} from '../controllers/auth.controller';
import {
  validateLogin,
  validateGoogleLogin,
  validateHealthIdRequestOtp,
  validateHealthIdVerify,
} from '../validators/auth.validator';
import { validateBody } from '../middleware/validate.middleware';

const router = Router();

router.post('/login', validateBody(validateLogin), loginController);
router.post('/google', validateBody(validateGoogleLogin), googleLoginController);
router.post(
  '/healthid/request-otp',
  validateBody(validateHealthIdRequestOtp),
  healthIdRequestOtpController,
);
router.post(
  '/healthid/verify',
  validateBody(validateHealthIdVerify),
  healthIdVerifyController,
);

export default router;
