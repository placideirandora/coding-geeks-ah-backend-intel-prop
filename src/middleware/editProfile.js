import model from '../sequelize/models';

const { User } = model;

const canEditProfile = async (req, res, next) => {
  const suggestedUsername = req.params.username;
  const userModel = await User.findOne({ where: { email: req.userData.email } });
  const owner = await User.findOne({ where: { userName: suggestedUsername } });

  if (!owner) {
    return res.status(404).send({
      error: `User ${suggestedUsername} not found`
    });
  }

  const trueUsername = userModel.userName;
  const userRole = req.userData.role;
  const ownerRole = owner.role;

  if (trueUsername !== suggestedUsername) {
    if ((userRole !== 'admin' && userRole !== 'super-admin')
    || (userRole === 'admin' && ownerRole === 'admin')) {
      return res.status(403).send({
        error: 'Sorry! You cannot edit the profile that is not yours'
      });
    }
  }
  next();
};
export default canEditProfile;
