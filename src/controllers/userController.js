import { config } from 'dotenv';
import { User } from '../sequelize/models';
<<<<<<< HEAD
import { hashedPassword, genToken } from '../helpers/auth';
=======
import { hashedPassword } from '../helpers/auth';
>>>>>>> feat(signup endpoint): user should signup

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
<<<<<<< HEAD
          error: `Email ${email} already exists`
=======
          message: `Email ${email} already exists`
>>>>>>> feat(signup endpoint): user should signup
        });
      }

      if (name) {
        return res.status(409).json({
          status: 'failed',
<<<<<<< HEAD
          error: `userName ${userName} already taken`
=======
          message: `userName ${userName} already taken`
>>>>>>> feat(signup endpoint): user should signup
        });
      }

      req.body.password = hashedPassword(password);

      const createdUser = await User.create(req.body);
<<<<<<< HEAD
      const userToken = genToken(createdUser, process.env.SECRET_KEY);
=======
>>>>>>> feat(signup endpoint): user should signup

      return res.status(201).json({
        status: 'success',
        message: 'User created',
        data: {
<<<<<<< HEAD
          token: userToken,
          id: createdUser.id,
=======
>>>>>>> feat(signup endpoint): user should signup
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          userName: createdUser.userName,
          email: createdUser.email,
          role: createdUser.role
        }
      });
    } catch (err) {
<<<<<<< HEAD
      // console.log(err);
=======
      console.log(err);
>>>>>>> feat(signup endpoint): user should signup
    }
  }
}

export default Authentication;
