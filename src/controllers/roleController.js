import { Role, Permission } from '../sequelize/models';

/**
 * @description Users role and thier permission
 */
class roleController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containing a new created permission
   */
  static async createPermision(req, res) {
    const { role } = req.params;
    const newPermission = req.body.permission;

    const { id } = await Role.findOne({ where: { role } });
    const permission = await Permission.findOne({ where: { roleId: id } });

    if (permission && permission.roleId === id && permission.permission === newPermission) {
      return res.status(409).json({
        error: 'This permission is already defined'
      });
    }
    const payload = {
      roleId: id,
      permission: newPermission,
    };

    const createPermission = await Permission.create(payload);
    return res.status(201).json({
      permission: {
        id: createPermission.id,
        role,
        permission: createPermission.permission,
        createdAt: createPermission.createdAt,
        updatedAt: createPermission.updatedAt
      }
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containing a list of permission to the different useres
   */
  static async getRolePermissions(req, res) {
    const { role } = req.params;
    const { id } = await Role.findOne({ where: { role } });

    const permissions = await Permission.findAll({ where: { roleId: id } });

    if (permissions.length === 0) {
      return res.status(404).json({
        message: 'Permission not found'
      });
    }
    return res.status(200).json({
      permissions
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containing a data of updated permission
   */
  static async updatePermission(req, res) {
    const { permissionId } = req.params;
    const newPermission = req.body;

    const permission = await Permission.findOne({ where: { id: permissionId } });

    if (!permission) {
      return res.status(404).json({
        message: 'Permission not found'
      });
    }

    const updatePermission = await Permission.update(newPermission, {
      where: { id: permissionId },
      returning: true,
      plain: true
    });

    return res.status(200).json({
      permission: updatePermission[1]
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} return object containing a message of permission deleted successfully
   */
  static async deletePermission(req, res) {
    const { permissionId } = req.params;

    const permission = await Permission.findOne({ where: { id: permissionId } });

    if (!permission) {
      return res.status(404).json({
        message: 'Permission not found'
      });
    }

    await Permission.destroy({ where: { id: permissionId } });

    return res.status(200).json({
      message: 'Permission deleted successfully'
    });
  }
}

export default roleController;
