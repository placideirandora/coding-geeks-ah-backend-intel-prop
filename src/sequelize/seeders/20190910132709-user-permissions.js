export const up = queryInterface => queryInterface.bulkInsert('Permissions', [{
  roleId: 3,
  permission: 'CREATE_ARTICLE',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 3,
  permission: 'DELETE_ARTICLE',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  roleId: 3,
  permission: 'UPDATE_ARTICLE',
  createdAt: new Date(),
  updatedAt: new Date()
}
], {});

export const down = queryInterface => queryInterface.bulkDelete('Permissions', null, {});
