export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Statistics', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    articleId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    articleSlug: {
      type: Sequelize.STRING
    },
    authorId: {
      type: Sequelize.INTEGER
    },
    reads: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Statistics')
};
