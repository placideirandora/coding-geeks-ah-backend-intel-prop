import { User } from '../sequelize/models/index';

const verifyEmail = async (req, res) => {
  const userEmail = req.userData.email;
  const registeredUser = await User.findOne({ where: { email: userEmail } });

  if (registeredUser) {
    User.update({ status: 'active' }, { where: { email: userEmail } });
    return res.status(200).json({
      message: `You have successfully verified your email: ${userEmail}. You can now signç into your account!`
    });
  }
};

export default verifyEmail;
