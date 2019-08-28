const checkAdmin = (req, res, next) => {
  const userRole = req.userData.role;

  if (userRole !== 'super-admin') {
    if (userRole !== 'admin') {
      return res.status(403).json({
        error: 'Unathorized access'
      });
    }
  }
  next();
};

export default checkAdmin;
