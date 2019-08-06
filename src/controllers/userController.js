import { config } from 'dotenv';
import { User } from '../sequelize/models';
import { hashedPassword } from '../helpers/auth';

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
          status: 'failed',
          message: `Email ${email} already exists`
        });
      }

      if (name) {
        return res.status(409).json({
          status: 'failed',
          message: `userName ${userName} already taken`
        });
      }

      req.body.password = hashedPassword(password);

      const createdUser = await User.create(req.body);

      return res.status(201).json({
        status: 'success',
        message: 'User created',
        data: {
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          userName: createdUser.userName,
          email: createdUser.email,
          role: createdUser.role
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default Authentication;
