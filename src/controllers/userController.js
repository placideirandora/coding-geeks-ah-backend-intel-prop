import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from '../sequelize/models';
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

      const createdUser = await User.create(req.body);
      const userToken = genToken(createdUser);
      const action = 'verify-email';

      await sendEmail(action, createdUser.email, userToken);

      return res.status(201).json({
        message: 'User created. Please, Check your email for a verification link.',
        data: {
          token: userToken,
          id: createdUser.id,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          userName: createdUser.userName,
          email: createdUser.email,
          role: createdUser.role
        }
      });
    } catch (err) {
      // console.log(err);
    }
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the confirmation message
   */
  static async emailSender(req, res) {
    const { email } = req.body;
    const result = await User.findOne({ where: { email } });
    if (!result) {
      return res.status(404).json({
        errors: `User with email: ${email} not found..`
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
   *
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
}

export default Authentication;
