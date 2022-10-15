import express from 'express';
import connectmultiparty from 'connect-multiparty';
import verifyToken from '../middleware/verifyToken';
import UserFollow from '../controllers/followController';
import canEditProfile from '../middleware/editProfile';
import Notification from '../controllers/notificationController';
import Profile from '../controllers/profileController';
import Validation from '../middleware/validation';

const profilesRouter = express.Router();
const connectMulti = connectmultiparty();

profilesRouter.get('/:username', Profile.user);
profilesRouter.get('/', verifyToken, Profile.fetchProfiles);
profilesRouter.put('/:username', [verifyToken, connectMulti, canEditProfile, Validation.profileValidation, Validation.imageValidation], Profile.editProfile);
profilesRouter.post('/:userName/follow', verifyToken, UserFollow.followUser);
profilesRouter.delete('/:userName/unfollow', verifyToken, UserFollow.unFollowUser);
profilesRouter.get('/:userName/following', verifyToken, UserFollow.getFollowingList);
profilesRouter.get('/:userName/followers', verifyToken, UserFollow.getFollowersList);
profilesRouter.patch('/:username/notifications/:subscribe', [verifyToken, canEditProfile], Notification.optInOutNotificatation);
profilesRouter.get('/notifications/all', verifyToken, Notification.getNotification);
profilesRouter.post('/notifications/:id/read', verifyToken, Notification.readOneNotification);
profilesRouter.patch('/notifications/read/all', verifyToken, Notification.readAllNotification);

export default profilesRouter;
