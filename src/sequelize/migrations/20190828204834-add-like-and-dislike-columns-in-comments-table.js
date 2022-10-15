module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Comments',
        'likes',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      ),

      queryInterface.addColumn(
        'Comments',
        'dislikes',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      ),
    ]);
  },

  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn(
        'Comments',
        'likes'
      ),
      queryInterface.removeColumn(
        'Comments',
        'dislikes'
      )
    ]);
  }
};
