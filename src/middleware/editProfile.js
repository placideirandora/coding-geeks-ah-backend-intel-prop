import model from '../sequelize/models';

const { User } = model;

const canEditProfile = async (req, res, next) => {
  const suggestedUsername = req.params.username;
  const userModel = await User.findOne({ where: { email: req.userData.email } });
  const trueUsername = userModel.userName;

  if (trueUsername !== suggestedUsername) {
    return res.status(403).send({
      error: 'sorry! you can not edit the profile that is not yours'
    });
  }
  next();
};
export default canEditProfile;
