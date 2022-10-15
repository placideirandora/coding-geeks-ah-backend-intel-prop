module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'socialid',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'Users',
        'platform',
        Sequelize.STRING
      )
    ]);
  },

  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn(
        'Users',
        'socialid'
      ),
      queryInterface.removeColumn(
        'Users',
        'platform'
      )
    ]);
  }
};
