import bcrypt from 'bcrypt';

<<<<<<< HEAD
export const up = queryInterface => queryInterface.bulkInsert('Users', [{
=======
export const up = queryInterface => queryInterface.bulkInsert('User', [{
>>>>>>> feat(signup endpoint): user should signup
  firstName: 'Eric',
  lastName: 'Malaba',
  userName: 'eubule',
  email: 'eric.malaba@gmail.com',
  password: bcrypt.hashSync('Superadmin12', 10),
  role: 'super-admin'
<<<<<<< HEAD
}], {});

export const down = queryInterface => queryInterface.bulkDelete('Users', null, {});
=======
}]);

export const down = queryInterface => queryInterface.bulkDelete('User', null);
>>>>>>> feat(signup endpoint): user should signup
