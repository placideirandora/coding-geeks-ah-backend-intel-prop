export default {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'notify', {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }),
    ]);
  },
  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn(
        'Users',
        'notify'
      )
    ]);
  }
};
