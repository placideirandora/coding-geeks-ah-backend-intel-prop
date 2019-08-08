import express from 'express';
import Validation from '../middleware/validation';
import UserAuth from '../controllers/userController';
import emailValidatator from '../middleware/emailValidation';
import pwdValidator from '../middleware/passwordValidation';
import resetPwd from '../middleware/resetPassword';

const router = express.Router();

router.post('/api/v1/users', Validation.signupValidation, UserAuth.signup);
router.post('/api/v1/send-email', emailValidatator.emailValidation, UserAuth.sendEmail);
router.post('/api/v1/reset-password/:token', resetPwd, pwdValidator.passwordValidation, UserAuth.resetPassword);

export default router;
