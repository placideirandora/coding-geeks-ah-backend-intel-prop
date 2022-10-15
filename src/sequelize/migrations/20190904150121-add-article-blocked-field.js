export default {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Articles',
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
        'Articles',
        'blocked'
      ),
    ]);
  }
};
