export default {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'blocked',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      ),
    ]);
  },

  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn(
        'Users',
        'blocked'
      ),
    ]);
  }
};
