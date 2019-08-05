import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * @method GenToken
 * - Generates jwtToken for authentication using user-id, user-email and role
 * -
 */

const genToken = user => jwt.sign(
  { id: user.id, email: user.email, role: user.role },
  process.env.SECRET_KEY,
  { expiresIn: '1d' }
);
export default genToken;
