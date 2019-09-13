export const up = queryInterface => queryInterface.bulkInsert('Permissions', [{
  roleId: 1,
  permission: 'CREATE_USER',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'UPDATE_USER_ROLE',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'UPDATE_USER',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'DELETE_USER',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'CREATE_ARTICLE',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'DELETE_ARTICLE',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'UPDATE_ARTICLE',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 1,
  permission: 'READ_REPORT',
  createdAt: new Date(),
  updatedAt: new Date()
}
], {});

export const down = queryInterface => queryInterface.bulkDelete('Permissions', null, {});
