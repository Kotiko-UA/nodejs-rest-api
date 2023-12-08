import express from 'express';
import authControllers from '../../controllers/auth-controllers.js';
const authRouter = express.Router();
import { authenticate, isEmptyBody } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import {
  userRegisterSchema,
  userLoginSchema,
  updateSubsctiptionSchema,
  userEmailSchema,
} from '../../models/auth-users.js';

authRouter.post(
  '/register',
  isEmptyBody,
  validateBody(userRegisterSchema),
  authControllers.register
);

authRouter.get('/verify/:verificationToken', authControllers.verify);

authRouter.post(
  '/verify',
  isEmptyBody,
  validateBody(userEmailSchema),
  authControllers.resendVerify
);

authRouter.get('/current', authenticate, authControllers.current);

authRouter.post(
  '/login',
  isEmptyBody,
  validateBody(userLoginSchema),
  authControllers.login
);

authRouter.post(
  '/subscription',
  authenticate,
  isEmptyBody,
  validateBody(updateSubsctiptionSchema),
  authControllers.updateSubscription
);

authRouter.post('/logout', authenticate, authControllers.logout);

export default authRouter;
