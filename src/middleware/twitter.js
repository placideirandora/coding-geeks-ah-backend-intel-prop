export default (req, res, next) => {
  req.user = {
    firstName: 'Someone',
    lastName: 'Testing',
    userName: 'Someone40',
    email: 'someone@epicmail.com',
    socialid: '2222222222',
    platform: 'twitter'
  };
  next();
};
