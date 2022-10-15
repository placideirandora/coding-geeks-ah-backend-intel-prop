import { config } from 'dotenv';
import { User, Notification } from '../sequelize/models';

config();
/**
 * @description Users should be able to receive notifications
 */
class NotificationController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containg message
   */
  static async optInOutNotificatation(req, res) {
    const user = req.params.username;
    const subscription = req.params.subscribe;

    if (subscription !== 'subscribe') {
      if (subscription !== 'unsubscribe') {
        return res.status(400).json({
          message: 'Please use either subscribe or unsubscribe'
        });
      }
    }

    if (subscription === 'subscribe') {
      await User.update(
        { notify: true },
        { where: { userName: user } }
      );
      return res.status(200).json({
        message: 'You have successfully subscribed to email notification'
      });
    }

    if (subscription === 'unsubscribe') {
      await User.update(
        { notify: false },
        { where: { userName: user } }
      );
      return res.status(200).json({
        message: 'You have successfully unsubscribed to email notification'
      });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containg data
   */
  static async getNotification(req, res) {
    const { id } = req.userData;
    const userNotification = await Notification.findAll({ where: { userId: id, status: 'unread' } });
    if (userNotification.length === 0) {
      return res.status(404).json({
        message: 'No notification found at the moment'
      });
    }
    return res.status(200).json({
      data: userNotification
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containg message
   */
  static async readOneNotification(req, res) {
    const { id } = req.userData;
    const notificationId = parseInt(req.params.id, 10);

    const updateNotification = await Notification.findOne(
      { where: { userId: id, id: notificationId } }
    );

    if (!updateNotification) {
      return res.status(404).json({
        message: 'No notification found at the moment'
      });
    }

    await Notification.update(
      { status: 'read' },
      { where: { userId: id, id: notificationId } }
    );

    return res.status(200).json({
      message: 'Notification successfully marked as read'
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containg message
   */
  static async readAllNotification(req, res) {
    const { id } = req.userData;
    const getUsers = await Notification.findAll({ where: { userId: id } });
    if (getUsers.length === 0) {
      return res.status(404).json({
        message: 'No notification found at the moment'
      });
    }
    const getAllUsers = getUsers.map(data => data.get());
    getAllUsers.forEach(async ({ userId }) => {
      await Notification.update(
        { status: 'read' },
        { where: { userId } }
      );
    });
    return res.status(200).json({
      message: 'Notifications successfully marked as read'
    });
  }
}

export default NotificationController;
