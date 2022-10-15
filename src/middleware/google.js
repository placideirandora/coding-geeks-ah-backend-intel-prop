export default (req, res, next) => {
  req.user = {
    firstName: 'Someone',
    lastName: 'Testing',
    userName: 'Someone40',
    email: 'someone@epicmail.com',
    socialid: '1111111111',
    platform: 'google'
  };
  next();
};
