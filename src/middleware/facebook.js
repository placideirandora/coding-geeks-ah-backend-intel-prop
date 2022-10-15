export default (req, res, next) => {
  req.user = {
    firstName: 'Someone',
    lastName: 'Testing',
    userName: 'Someone40',
    email: 'someone@epicmail.com',
    socialid: '3333333333',
    platform: 'facebook'
  };
  next();
};
