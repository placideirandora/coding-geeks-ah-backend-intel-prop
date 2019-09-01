const checkAdmin = (req, res, next) => {
  const userRole = req.userData.role;

  if (userRole !== 'admin' && userRole !== 'super-admin') {
    return res.status(403).json({
      error: 'Unathorized access'
    });
  }
  next();
};

const adminPermission = (req, res, next) => {
  const userRole = req.userData.role;

  if (userRole !== 'super-admin') {
    return res.status(403).json({
      error: 'You do not have permission to perform this action'
    });
  }
  next();
};

export { adminPermission, checkAdmin };
