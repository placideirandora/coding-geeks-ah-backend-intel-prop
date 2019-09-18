import express from 'express';
import verifyToken from '../middleware/verifyToken';
import { adminPermission, checkAdmin } from '../middleware/adminPermissions';
import Validation from '../middleware/validation';
import UserAuth from '../controllers/userController';
import Role from '../controllers/permissionController';
import * as permission from '../middleware/permissions';
import checkPermissions from '../middleware/checkPermissions';

const usersRouter = express.Router();

usersRouter.post('/signup', Validation.signupValidation, UserAuth.signup);
usersRouter.post('/', [verifyToken, adminPermission, permission.createUser, checkPermissions, Validation.signupValidation], UserAuth.signup);
usersRouter.post('/reset-password/:token', verifyToken, Validation.passwordValidation, UserAuth.resetPassword);
usersRouter.get('/verify-email/:token', verifyToken, UserAuth.verifyEmail);
usersRouter.post('/send-email', Validation.emailValidation, UserAuth.emailSender);
usersRouter.post('/logout', [verifyToken], UserAuth.logout);
usersRouter.post('/login', Validation.loginValidation, UserAuth.login);
usersRouter.delete('/:username', [verifyToken, permission.deleteUser, checkPermissions], UserAuth.deleteUser);
usersRouter.patch('/:username', [verifyToken, adminPermission, permission.updateUserRole, checkPermissions, Validation.updateRoleValidation], UserAuth.updateRole);
usersRouter.put('/:username/block', [verifyToken, checkAdmin, permission.updateUser, checkPermissions], UserAuth.blockUser);
usersRouter.put('/:username/unblock', [verifyToken, checkAdmin, permission.updateUser, checkPermissions], UserAuth.unblockUser);
usersRouter.post('/:role/permissions', [verifyToken, adminPermission, Validation.permissionValidation, Validation.RoleParamsValidation], Role.createPermision);
usersRouter.get('/:role/permissions', [verifyToken, checkAdmin, Validation.RoleParamsValidation], Role.getRolePermissions);
usersRouter.patch('/:permissionId/permissions', [verifyToken, adminPermission, Validation.permissionValidation, Validation.idPermissionValidation], Role.updatePermission);
usersRouter.delete('/:permissionId/permissions', [verifyToken, adminPermission, Validation.idPermissionValidation], Role.deletePermission);

export default usersRouter;
