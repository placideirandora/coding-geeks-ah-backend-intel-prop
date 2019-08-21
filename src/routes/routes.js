import express from 'express';
import passport from 'passport';
import connectmultiparty from 'connect-multiparty';
import Validation from '../middleware/validation';
import ContentType from '../middleware/contentType';
import UserAuth from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';
import googleRequest from '../middleware/google';
import twitterRequest from '../middleware/twitter';
import facebookRequest from '../middleware/facebook';
import UserFollow from '../controllers/followController';
import Profile from '../controllers/profileController';
import canEditProfile from '../middleware/editProfile';
import Article from '../controllers/articleController';
import Notification from '../controllers/notificationController';

const router = express.Router();

const connectMulti = connectmultiparty();

router.post('/api/v1/users', Validation.signupValidation, UserAuth.signup);
router.get('/api/v1/profiles/:username', Profile.user);
router.get('/api/v1/profiles', verifyToken, Profile.fetchProfiles);
router.put('/api/v1/profiles/:username', [verifyToken, connectMulti, canEditProfile, Validation.profileValidation, Validation.imageValidation], Profile.editProfile);
router.post('/api/v1/send-email', Validation.emailValidation, UserAuth.emailSender);
router.post('/api/v1/reset-password/:token', verifyToken, Validation.passwordValidation, UserAuth.resetPassword);
router.get('/api/v1/verify-email/:token', verifyToken, UserAuth.verifyEmail);
router.post('/api/v1/send-email', Validation.emailValidation, UserAuth.emailSender);
router.post('/api/v1/reset-password/:token', verifyToken, Validation.passwordValidation, UserAuth.resetPassword);
router.post('/api/v1/login', Validation.loginValidation, UserAuth.login);
router.get('/api/v1/auth/facebook', passport.authenticate('facebook', { session: false, scope: ['email'] }));
router.get('/api/v1/auth/facebook/test', facebookRequest, UserAuth.facebookLogin);
router.get('/api/v1/auth/facebook/callback', passport.authenticate('facebook'), UserAuth.facebookLogin);
router.get('/api/v1/auth/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));
router.get('/api/v1/auth/google/test', googleRequest, UserAuth.googleLogin);
router.get('/api/v1/auth/google/callback', passport.authenticate('google'), UserAuth.googleLogin);
router.get('/api/v1/auth/twitter', passport.authenticate('twitter', { session: true, scope: ['email'] }));
router.get('/api/v1/auth/twitter/test', twitterRequest, UserAuth.twitterLogin);
router.get('/api/v1/auth/twitter/callback', passport.authenticate('twitter'), UserAuth.twitterLogin);
router.post('/api/v1/users/logout', [verifyToken], UserAuth.logout);
router.post('/api/v1/users/login', Validation.loginValidation, UserAuth.login);
router.post('/api/v1/articles', [verifyToken, connectMulti, Validation.createArticleValidation, ContentType, Validation.imageValidation], Article.createArticle);
router.get('/api/v1/articles', Article.getAllArticles);
router.post('/api/v1/profiles/:userName/follow', verifyToken, UserFollow.followUser);
router.delete('/api/v1/profiles/:userName/unfollow', verifyToken, UserFollow.unFollowUser);
router.get('/api/v1/profiles/:userName/following', verifyToken, UserFollow.getFollowingList);
router.get('/api/v1/profiles/:userName/followers', verifyToken, UserFollow.getFollowersList);

router.patch('/api/v1/profiles/:username/notification/:subscribe', [verifyToken, canEditProfile], Notification.optInOutNotificatation);
router.get('/api/v1/profiles/notification/all', verifyToken, Notification.getNotification);
router.patch('/api/v1/profiles/notification/:id/read', verifyToken, Notification.readOneNotification);
router.patch('/api/v1/profiles/notification/read/all', verifyToken, Notification.readAllNotification);

export default router;
