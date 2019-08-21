import bcrypt from 'bcrypt';

export const up = queryInterface => queryInterface.bulkInsert('Users', [{
  firstName: 'Erin',
  lastName: 'Mugisho',
  userName: 'admin',
  email: 'admin@gmail.com',
  password: bcrypt.hashSync('Admin-user12', 10),
  role: 'admin',
  verified: true
}], {});

export const down = queryInterface => queryInterface.bulkDelete('Users', null, {});
