import express from 'express';
import connectmultiparty from 'connect-multiparty';
import Validation from '../middleware/validation';
import UserAuth from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';
import Profile from '../controllers/profile';
import canEditProfile from '../middleware/editProfile';

const router = express.Router();

const connectMulti = connectmultiparty();

router.post('/api/v1/users', Validation.signupValidation, UserAuth.signup);
router.get('/api/v1/profiles/:userName', Profile.user);
router.put('/api/v1/profiles/:username', [verifyToken, connectMulti, canEditProfile, Validation.profileValidation, Validation.imageValidation], Profile.editProfile);
router.post('/api/v1/send-email', Validation.emailValidation, UserAuth.emailSender);
router.post('/api/v1/reset-password/:token', verifyToken, Validation.passwordValidation, UserAuth.resetPassword);
router.get('/api/v1/verify-email/:token', verifyToken, UserAuth.verifyEmail);
router.post('/api/v1/send-email', Validation.emailValidation, UserAuth.emailSender);
router.post('/api/v1/reset-password/:token', verifyToken, Validation.passwordValidation, UserAuth.resetPassword);
router.post('/api/v1/login', Validation.loginValidation, UserAuth.login);

export default router;
