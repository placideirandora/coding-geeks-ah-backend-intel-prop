import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';

config();

const genToken = user => jwt.sign(
  { id: user.id, email: user.email, role: user.role },
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
/**
 * 
 * @param {*} user 
 */
export const genResetToken = user => jwt.sign(
  { email: user.email },
  process.env.SECRET_KEY,
  { expiresIn: '1h' }
);


export { genToken, hashedPassword, unhashedPassword, genResetToken };
