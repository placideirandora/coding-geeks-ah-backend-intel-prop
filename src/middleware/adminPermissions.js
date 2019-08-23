const adminPermission = (req, res, next) => {
  const userRole = req.userData.role;

  if (userRole !== 'super-admin') {
    return res.status(403).json({
      error: 'You do not have permission to perform this action'
    });
  }
  next();
};

export default adminPermission;
