import { config } from 'dotenv';
import { Notification, Follow, User } from '../../sequelize/models';
import eventEmitter from './eventEmitter';
import sendEmail from '../mailer';

config();
export default async (article) => {
  const { APP_URL_FRONTEND } = process.env;
  const { authorId } = article.get();
  const owner = await User.findOne({ where: { id: authorId } });
  let followers = await Follow.findAll({
    where: { following: authorId },
    include: [
      {
        model: User,
        as: 'followerUser',
        attributes: ['id', 'firstName', 'lastName', 'userName', 'email', 'image', 'notify']
      }
    ]
  });

  followers = Array.isArray(followers) ? followers.map(follower => follower.get()) : [];

  followers.forEach(async ({ follower, followerUser }) => {
    const payload = {
      userId: follower,
      message: `${owner.userName} published new article`,
      url: `${APP_URL_FRONTEND}/articles/${article.get().slug}`
    };
    await Notification.create(payload);
    eventEmitter.emit('new_inapp', payload.message, followerUser.userName);

    if (followerUser.notify === true) {
      payload.ownerId = owner.userName;
      await sendEmail('notification', followerUser.email, payload);
    }
  });
};
