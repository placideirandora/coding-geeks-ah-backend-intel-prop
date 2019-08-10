import express from 'express';
import Validation from '../middleware/validation';
import UserAuth from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';
<<<<<<< HEAD
import verifyEmail from '../controllers/verifyEmail';
=======
>>>>>>> 92d6003bc62251c09180c3ea5a5b6287ad589ed2

const router = express.Router();

router.post('/api/v1/users', Validation.signupValidation, UserAuth.signup);
<<<<<<< HEAD
router.post('/api/v1/verify-email/:token', verifyToken, verifyEmail);
=======
router.post('/api/v1/send-email', Validation.emailValidation, UserAuth.emailSender);
router.post('/api/v1/reset-password/:token', verifyToken, Validation.passwordValidation, UserAuth.resetPassword);
>>>>>>> 92d6003bc62251c09180c3ea5a5b6287ad589ed2

export default router;
