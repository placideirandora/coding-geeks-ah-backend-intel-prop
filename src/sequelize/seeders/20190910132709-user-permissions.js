export const up = queryInterface => queryInterface.bulkInsert('Permissions', [{
  roleId: 3,
  permission: 'create article',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 3,
  permission: 'delete article',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 3,
  permission: 'update article',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 3,
  permission: 'update profile',
  createdAt: new Date(),
  updatedAt: new Date()
},
], {});

export const down = queryInterface => queryInterface.bulkDelete('Permissions', null, {});
