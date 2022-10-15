export default {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Articles', 'likes', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }),

      queryInterface.addColumn('Articles', 'dislikes', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }),
    ]);
  },

  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn(
        'Articles',
        'likes'
      ),
      queryInterface.removeColumn(
        'Articles',
        'dislikes'
      )
    ]);
  }
};
