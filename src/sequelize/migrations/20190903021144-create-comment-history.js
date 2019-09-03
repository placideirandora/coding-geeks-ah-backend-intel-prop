export const up = (queryInterface, Sequelize) => queryInterface.createTable('commentHistories', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  articleSlug: {
    allowNull: false,
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  commentId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: 'Comments',
      key: 'id'
    }
  },
  editedComment: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

export const down = queryInterface => queryInterface.dropTable('commentHistories');
