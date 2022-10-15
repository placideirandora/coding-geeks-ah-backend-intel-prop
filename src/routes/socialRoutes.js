import express from 'express';
import passport from 'passport';
import UserAuth from '../controllers/userController';
import googleRequest from '../middleware/google';
import twitterRequest from '../middleware/twitter';
import facebookRequest from '../middleware/facebook';

const socialRouter = express.Router();
socialRouter.get('/facebook', passport.authenticate('facebook', { session: false, scope: ['email'] }));
socialRouter.get('/facebook/test', facebookRequest, UserAuth.facebookLogin);
socialRouter.get('/facebook/callback', passport.authenticate('facebook'), UserAuth.facebookLogin);
socialRouter.get('/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));
socialRouter.get('/google/test', googleRequest, UserAuth.googleLogin);
socialRouter.get('/google/callback', passport.authenticate('google'), UserAuth.googleLogin);
socialRouter.get('/twitter', passport.authenticate('twitter', { session: true, scope: ['email'] }));
socialRouter.get('/twitter/test', twitterRequest, UserAuth.twitterLogin);
socialRouter.get('/twitter/callback', passport.authenticate('twitter'), UserAuth.twitterLogin);

export default socialRouter;
