const checkAdmin = (req, res, next) => {
  const userRole = req.userData.role;

  if (userRole !== 'admin' && userRole !== 'super-admin') {
    return res.status(403).json({
      error: 'Unathorized access'
    });
  }
  next();
};

export default checkAdmin;
