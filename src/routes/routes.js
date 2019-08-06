import express from 'express';
<<<<<<< HEAD
import Validation from '../middleware/validation';
=======
import Validation from '../middlewares/validation';
>>>>>>> feat(signup endpoint): user should signup
import UserAuth from '../controllers/userController';

const router = express.Router();

<<<<<<< HEAD
router.post('/api/v1/users', Validation.signupValidation, UserAuth.signup);
=======
router.post('/api/v1/auth/signup', Validation.signupValidation, UserAuth.signup);
>>>>>>> feat(signup endpoint): user should signup

export default router;
