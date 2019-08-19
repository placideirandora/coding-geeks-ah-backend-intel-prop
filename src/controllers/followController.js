import { config } from 'dotenv';
import { User, Follow } from '../sequelize/models';

config();
/**
 * @description author follow each other
 */
class Following {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containg data
   */
  static async followUser(req, res) {
    const { userName } = req.params;
    const userId = req.userData.id;

    const checkUser = await User.findOne({ where: { userName, verified: true } });

    if (!checkUser) {
      return res.status(404).json({
        error: `User name ${userName} does not exist`
      });
    }

    const { id } = checkUser;
    const checkFollower = await Follow.findOne({ where: { follower: userId, following: id } });

    if (checkFollower) {
      return res.status(409).json({
        error: `You have already followed ${userName}`
      });
    }

    if (checkUser.id === userId) {
      return res.status(403).json({
        error: 'You can not follow yourself'
      });
    }

    const newFollowing = {
      follower: userId,
      following: checkUser.id
    };
    const newSavedFollow = await Follow.create(newFollowing);
    return res.status(201).json({
      data: newSavedFollow
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containg message
   */
  static async unFollowUser(req, res) {
    const { userName } = req.params;
    const userId = req.userData.id;

    const getUserId = await User.findOne({ where: { userName } });

    if (!getUserId) {
      return res.status(404).json({
        error: `User name ${userName} does not exist`
      });
    }

    const { id } = getUserId;
    const checkFollower = await Follow.findOne({ where: { follower: userId, following: id } });

    if (!checkFollower) {
      return res.status(409).json({
        error: `User name ${userName} not followed by you`
      });
    }

    await Follow.destroy({ where: { follower: userId, following: id } });
    return res.status(200).json({
      message: `You are no longer following ${userName}`
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containg data
   *
   */
  static async getFollowingList(req, res) {
    const userList = [];
    const { userName } = req.params;

    const getUserId = await User.findOne({ where: { userName } });

    if (!getUserId) {
      return res.status(404).json({
        error: `User name ${userName} does not exist`
      });
    }

    const userId = getUserId.id;
    const followingList = await Follow.findAll({ where: { follower: userId } });

    if (followingList.length === 0) {
      return res.status(404).json({
        message: `${userName} is currently not following anyone`
      });
    }

    await Promise.all(followingList.map(async (follower) => {
      const userInfo = await User.findOne({ where: { id: follower.following } });
      userList.push({
        id: userInfo.dataValues.id,
        username: userInfo.dataValues.userName,
      });
      return userList;
    }));
    return res.status(200).json({
      data: userList
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containg data
   *
   */
  static async getFollowersList(req, res) {
    const userList = [];
    const { userName } = req.params;

    const getUser = await User.findOne({ where: { userName } });

    if (!getUser) {
      return res.status(404).json({
        error: `User name ${userName} does not exist`
      });
    }

    const userId = getUser.id;
    const followersList = await Follow.findAll({ where: { following: userId } });

    if (followersList.length === 0) {
      return res.status(404).json({
        message: `${userName} currently has no followers`
      });
    }

    await Promise.all(followersList.map(async (follower) => {
      const userInfo = await User.findOne({ where: { id: follower.follower } });
      userList.push({
        id: userInfo.dataValues.id,
        username: userInfo.dataValues.userName,
      });
      return userList;
    }));
    return res.status(200).json({
      data: userList
    });
  }
}

export default Following;
