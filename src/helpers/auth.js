import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';

config();

const genToken = user => jwt.sign(
  {
    id: user.id, email: user.email, role: user.role, username: user.userName
  },
  process.env.SECRET_KEY,
  { expiresIn: '1d' }
);

/**
 * @param {password} password
 * @returns {oject} hashed password
 */
const hashedPassword = password => bcrypt.hashSync(password, 10);

/**
 *
 * @param {object} hashedPass
 * @param {object} compare
 * @return {object} password
 */
const unhashedPassword = (hashedPass, compare) => bcrypt.compareSync(hashedPass, compare);


export {
  genToken, hashedPassword, unhashedPassword
};
