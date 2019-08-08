import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    res.status(401).json({ status: 401, error: 'Invalid token' });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(403).json({ status: 403, error: `${error.message}` });
      }
      req.userData = decoded;
      next();
    });
  }
};
export default verifyToken;
