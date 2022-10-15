import bcrypt from 'bcrypt';

export const up = queryInterface => queryInterface.bulkInsert('Users', [{
  firstName: 'Raymond',
  lastName: 'Gakwaya',
  userName: 'rayGakwa',
  email: 'ray@gmail.com',
  password: bcrypt.hashSync('Admin1234', 10),
  role: 'admin',
  verified: true
},
{
  firstName: 'Carlos',
  lastName: 'Gringo',
  userName: 'carlosG',
  email: 'carlos@gmail.com',
  password: bcrypt.hashSync('User1234', 10),
  role: 'user',
  verified: true
}], {});
export const down = queryInterface => queryInterface.bulkDelete('Users', null, {});
