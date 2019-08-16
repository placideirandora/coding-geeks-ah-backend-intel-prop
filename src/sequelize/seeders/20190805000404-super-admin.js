import bcrypt from 'bcrypt';

export const up = queryInterface => queryInterface.bulkInsert('Users', [{
  firstName: 'Eric',
  lastName: 'Malaba',
  userName: 'eubule',
  email: 'eric.malaba@gmail.com',
  password: bcrypt.hashSync('Superadmin12', 10),
  role: 'super-admin',
  verified: true
}], {});

export const down = queryInterface => queryInterface.bulkDelete('Users', null, {});
