import { Permission, Role } from '../sequelize/models';

const checkPermissions = async (req, res, next) => {
  const { role } = req.userData;
  const { id } = await Role.findOne({ where: { role } });
  const checkPermission = await Permission.findOne({
    where: {
      roleId: id,
      permission: req.permissions
    },
  });
  if (!checkPermission) {
    return res.status(403).json({
      error: 'You do not have permission to perform this action'
    });
  }
  next();
};

export default checkPermissions;
