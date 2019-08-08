import express from 'express';
import Validation from '../middleware/validation';
import UserAuth from '../controllers/userController';

const router = express.Router();

router.post('/api/v1/users', Validation.signupValidation, UserAuth.signup);

export default router;
