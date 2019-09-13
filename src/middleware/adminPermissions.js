const checkAdmin = (req, res, next) => {
  const userRole = req.userData.role;

  if (userRole !== 'admin' && userRole !== 'super-admin') {
    return res.status(403).json({
      error: 'You do not have enough priveledges to continue'
    });
  }
  next();
};

const adminPermission = (req, res, next) => {
  const userRole = req.userData.role;

  if (userRole !== 'super-admin') {
    return res.status(403).json({
      error: 'You do not have enough priveledges to continue'
    });
  }
  next();
};

export { adminPermission, checkAdmin };
