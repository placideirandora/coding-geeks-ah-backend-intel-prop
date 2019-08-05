/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

/**
 * @method verifyToken
 * - Gets token from req.params and verifies from requests
 */

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || typeof token === 'undefined') {
    res.status(401).json({ status: 401, error: 'Please login or register' });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(403).json({ status: 403, error: `${error.message}` });
      }
      req.id = decoded.id;
      req.email = decoded.email;
      req.role = decoded.role;
    });
    next();
  }
};
