import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { User, DroppedToken } from '../sequelize/models';
import { hashedPassword, genToken } from '../helpers/auth';
import sendEmail from '../helpers/mailer';

config();

/**
 * @description Authenticates user
 */
class Authentication {
  /**
   * @description user signup
   * @param {object} req
   * @param {object} res
   * @returns {object} signed up user
   */
  static async signup(req, res) {
    try {
      const { email, userName, password } = req.body;
      const user = await User.findOne({ where: { email } });
      const name = await User.findOne({ where: { userName } });

      if (user) {
        return res.status(409).json({
          error: `Email ${email} already exists`
        });
      }

      if (name) {
        return res.status(409).json({
          error: `userName ${userName} already taken`
        });
      }

      req.body.password = hashedPassword(password);

      if (req.userData) {
        req.body.role = (req.userData.role === 'super-admin') ? req.body.role : 'user';
      }

      const createdUser = await User.create(req.body);
      const userToken = genToken(createdUser);
      const action = 'verify-email';

      await User.update(
        {
          role: req.body.role,
        },
        {
          where: { userName: req.body.userName },
          returning: true,
          plain: true
        }
      );

      await sendEmail(action, createdUser.email, userToken);

      return res.status(201).json({
        message: 'User created. Please, Check your email for a verification link.',
        data: {
          id: createdUser.id,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          userName: createdUser.userName,
          email: createdUser.email,
          role: createdUser.role
        }
      });
    } catch (err) {
      throw (err);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} returns an object containing a response
   */
  static async verifyEmail(req, res) {
    const userEmail = req.userData.email;
    const registeredUser = await User.findOne({ where: { email: userEmail } });
    if (registeredUser) {
      User.update({ verified: true }, { where: { email: userEmail } });
      return res.status(200).json({
        message: `You have successfully verified your email: ${userEmail}. You can now sign into your account!`
      });
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} return an object containing the confirmation message
   */
  static async emailSender(req, res) {
    const { email } = req.body;
    const result = await User.findOne({ where: { email } });
    if (!result) {
      return res.status(404).json({
        error: `User with email: ${email} not found..`
      });
    }

    const userToken = genToken(result);
    const action = 'reset-password';

    await sendEmail(action, email, userToken);

    return res.status(200).json({
      message: 'Email sent, please check your email'
    });
  }

  /**
   * @param {*} req
   * @param {*} res
   * @returns {object} update the password of the user
   */
  static async resetPassword(req, res) {
    const { password } = req.body;

    const { email } = req.userData;
    const hashedPwd = bcrypt.hashSync(password, 10);
    await User.update({ password: hashedPwd }, { where: { email } });
    return res.status(200).json({
      message: 'You have reset your password Successfully!'
    });
  }

  /**
   * @description user login
   * @param {object} req
   * @param {object} res
   * @returns {object} logged in user
   */
  static login(req, res) {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return res.status(401).json({
          error: err.message
        });
      }
      res.status(200).json({
        message: 'Welcome, you are successfully logged in',
        data: {
          token: genToken(user),
          username: user.userName,
          email: user.email
        }
      });
    })(req, res);
  }

  /**
   * @description admins delete a user
   * @param {object} req
   * @param {object} res
   * @returns {obkject} success message
   */
  static async deleteUser(req, res) {
    try {
      const name = req.params.username;
      const userRole = req.userData.role;
      const user = await User.findOne({ where: { userName: name } });
      if (!user) {
        return res.status(404).json({
          error: `User with username ${name} not found`
        });
      }
      if ((userRole !== 'admin' || userRole !== 'super-admin')
      && (user.role === 'super-admin'
      || (userRole === 'admin' && user.role === 'admin'))) {
        return res.status(403).json({
          error: 'You do not have permission to perform this action'
        });
      }

      await User.destroy({
        where: {
          userName: name
        }
      });
      return res.status(200).json({
        message: `User ${name} successfully deleted`
      });
    } catch (err) {
      throw (err);
    }
  }

  /**
   * @description admin change user role
   * @param {object} req
   * @param {object} res
   *@returns {object} message
   */
  static async updateRole(req, res) {
    try {
      const name = req.params.username;
      const userRole = req.userData.role;
      const user = await User.findOne({ where: { userName: name } });
      if (!user) {
        return res.status(404).json({
          error: `User with username ${name} not found`
        });
      }
      if (userRole !== 'super-admin' || user.role === 'super-admin') {
        return res.status(403).json({
          error: 'You do not have permission to perform this action'
        });
      }
      const update = await User.update(
        {
          role: req.body.role
        },
        { where: { userName: name }, returning: true, plain: true }
      );
      const updatedUser = {
        id: update[1].id,
        Username: update[1].userName,
        email: update[1].email,
        bio: update[1].bio,
        role: update[1].role
      };
      return res.status(200).json({
        message: 'Role successfully updated',
        data: updatedUser
      });
    } catch (err) {
      throw (err);
    }
  }

  /**
   * @description user logout
   * @param {object} req
   * @param {object} res
   * @returns {object} logged out user
   */
  static async logout(req, res) {
    const token = req.headers.authorization;
    const identifier = token.match(/\d+/g).join(''); // Extract numbers only from token to be used to uniquely identify a token in db
    await DroppedToken.create({ identifier });

    return res.status(200).json({
      message: 'Successfully logged out.',
    });
  }
}

export default Authentication;
