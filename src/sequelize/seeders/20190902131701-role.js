export const up = queryInterface => queryInterface.bulkInsert('Roles', [{
  role: 'super-admin'
},
{
  role: 'admin'
},
{
  role: 'user'
}
], {});

export const down = queryInterface => queryInterface.bulkDelete('Roles', null, {});
