import { config } from 'dotenv';
import cloudinary from 'cloudinary';
import { User } from '../sequelize/models';

config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

/**
 * @description User profile
 */
class Profile {
  /**
       * @description get user profile
       * @param {object} req
       * @param {object} res
       * @returns {object} return object containing user profile
       */
  static async user(req, res) {
    const userName = req.params.username;
    try {
      const userfound = await User.findOne({ where: { userName } });
      if (!userfound) {
        return res.status(404).json({
          message: `Profile for ${userName} not found`,
        });
      }
      res.status(200).json({
        message: 'Successfully retrieved a user profile',
        data: {
          userName: userfound.userName,
          bio: userfound.bio,
          image: userfound.image,
        }
      });
    } catch (error) {
      // console.log(error);
    }
  }

  /**
   * @description fetch all the profiles
   * @param {object} req
   * @param {object} res
   * @returns {object} all available profiles
   */
  static async fetchProfiles(req, res) {
    try {
      const users = await User.findAll({
        where: { role: 'user' },
        attributes: ['userName', 'bio', 'image']
      });
      res.status(200).json({
        message: `${users.length} Users found`,
        data: users
      });
    } catch (err) {
      // console.log(err);
    }
  }

  /**
   * @description update user profile
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containing updated user profile
   */
  static async editProfile(req, res) {
    let filename = '';
    if (req.files.image) {
      filename = req.files.image.path;
    }

    cloudinary.v2.uploader.upload(filename, { tags: 'Authors-haven' }, async (err, image) => {
      try {
        const userName = req.params.username;
        const user = await User.findOne({ where: { userName } });
        const oldURL = user.image;
        const inputUsername = req.body.userName;
        if (inputUsername) {
          const usernamefound = await User.findOne({ where: { userName: inputUsername } });
          if (usernamefound) {
            return res.status(409).json({
              message: 'Sorry! The profile username taken, try another one'
            });
          }
        }


        let imgURL;
        if (!err) {
          imgURL = image.secure_url;
        }
        if (!imgURL) {
          imgURL = oldURL;
        }
        const updateProfile = await User.update(
          {
            userName: inputUsername,
            bio: req.body.bio,
            image: imgURL
          },
          { where: { userName }, returning: true, plain: true }
        );
        const newProfile = {
          userName: updateProfile[1].userName,
          email: updateProfile[1].email,
          bio: updateProfile[1].bio,
          image: updateProfile[1].image,
          upadatedAt: updateProfile[1].updatedAt,
        };
        res.status(200).json({
          message: 'Successfully updated the profile',
          data: newProfile,
        });
      } catch (error) {
        // console.log(error)
      }
    });
  }
}

export default Profile;
