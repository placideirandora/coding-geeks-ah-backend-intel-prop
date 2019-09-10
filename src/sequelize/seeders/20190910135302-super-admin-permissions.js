export const up = queryInterface => queryInterface.bulkInsert('Permissions', [{
  roleId: 1,
  permission: 'create user',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'update user role',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'update user',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'delete user',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'create article',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'delete article',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'update article',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'read report',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'update profile',
  createdAt: new Date(),
  updatedAt: new Date()
},
], {});

export const down = queryInterface => queryInterface.bulkDelete('Permissions', null, {});
