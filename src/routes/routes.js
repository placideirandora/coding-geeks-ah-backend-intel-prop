import express from 'express';
import Validation from '../middleware/validation';
import UserAuth from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';
import verifyEmail from '../controllers/verifyEmail';

const router = express.Router();

router.post('/api/v1/users', Validation.signupValidation, UserAuth.signup);
router.post('/api/v1/verify-email/:token', verifyToken, verifyEmail);

export default router;
