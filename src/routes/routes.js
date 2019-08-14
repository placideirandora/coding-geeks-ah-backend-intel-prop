import express from 'express';
import Validation from '../middleware/validation';
import UserAuth from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';
import UserFollow from '../controllers/followController';

const router = express.Router();

router.post('/api/v1/users', Validation.signupValidation, UserAuth.signup);
router.get('/api/v1/verify-email/:token', verifyToken, UserAuth.verifyEmail);
router.post('/api/v1/send-email', Validation.emailValidation, UserAuth.emailSender);
router.post('/api/v1/reset-password/:token', verifyToken, Validation.passwordValidation, UserAuth.resetPassword);
router.post('/api/v1/login', Validation.loginValidation, UserAuth.login);

router.post('/api/v1/:userName/follow', verifyToken, UserFollow.followUser);
router.delete('/api/v1/:userName/unfollow', verifyToken, UserFollow.unFollowUser);
router.get('/api/v1/:userName/following', verifyToken, UserFollow.getFollowingList);
router.get('/api/v1/:userName/followers', verifyToken, UserFollow.getFollowersList);

export default router;
