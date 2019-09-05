import bcrypt from 'bcrypt';

export const up = queryInterface => queryInterface.bulkInsert('Users', [{
  firstName: 'Emmanuel',
  lastName: 'CYUBAHIRO',
  userName: 'cyubahiro',
  email: 'cyuba@gmail.com',
  password: bcrypt.hashSync('cr7-f00t!b0L', 10),
  role: 'user',
  verified: true
},
{
  firstName: 'Joseph',
  lastName: 'KATEBERA',
  userName: 'kate',
  email: 'kate@gmail.com',
  password: bcrypt.hashSync('gotoBora-j00p!b0L', 10),
  role: 'user',
  verified: true
},
{
  firstName: 'Cyprien',
  lastName: 'NDAYIZEYE',
  userName: 'cypg',
  email: 'cypg@gmail.com',
  password: bcrypt.hashSync('kangaWu-j00p!b0L', 10),
  role: 'user',
  verified: true,
  blocked: true
}], {});

export const down = queryInterface => queryInterface.bulkDelete('Users', null, {});
