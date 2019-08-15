import jwt from 'jsonwebtoken';
import { DroppedToken } from '../sequelize/models';

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization || req.params.token;
  if (!token) {
    res.status(401).json({ error: 'Please log in or Register' });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
      if (token) {
        const identifier = token.match(/\d+/g).join('');
        const droppedToken = await DroppedToken.findOne({ where: { identifier }, logging: false });
        const rejectedToken = droppedToken;

        // Return user logged out message
        if (rejectedToken) {
          return res.status(401).send({
            message: 'You are logged out!'
          });
        }
      }
      if (error) {
        return res.status(403).json({ error: `${error.message}` });
      }
      req.userData = decoded;
      next();
    });
  }
};

export default verifyToken;
