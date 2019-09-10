export const up = queryInterface => queryInterface.bulkInsert('Permissions', [{
  roleId: 2,
  permission: 'create user',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'update user',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'delete user',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'create article',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'delete article',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'update article',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'read report',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'update profile',
  createdAt: new Date(),
  updatedAt: new Date()
},
], {});

export const down = queryInterface => queryInterface.bulkDelete('Permissions', null, {});
