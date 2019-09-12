export const up = queryInterface => queryInterface.bulkInsert('Permissions', [{
  roleId: 2,
  permission: 'CREATE_USER',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'UPDATE_USER',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'DELETE_USER',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'CREATE_ARTICLE',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'DELETE_ARTICLE',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'UPDATE_ARTICLE',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 2,
  permission: 'READ_REPORT',
  createdAt: new Date(),
  updatedAt: new Date()
}
], {});

export const down = queryInterface => queryInterface.bulkDelete('Permissions', null, {});
