import { User } from '../sequelize/models';

const findUser = async (req, res, next) => {
  const userId = req.userData.id;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(403).json({
      error: 'Provided token is not registered to you'
    });
  }
  next();
};

export default findUser;
