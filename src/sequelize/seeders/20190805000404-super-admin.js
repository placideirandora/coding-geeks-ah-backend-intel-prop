import bcrypt from 'bcrypt';

export const up = queryInterface => queryInterface.bulkInsert('Users', [{
  firstName: 'Eric',
  lastName: 'Malaba',
  userName: 'superadmin',
  email: 'malabadev6@gmail.com',
  password: bcrypt.hashSync('Super-admin12', 10),
  role: 'super-admin',
  verified: true
}], {});

export const down = queryInterface => queryInterface.bulkDelete('Users', null, {});
