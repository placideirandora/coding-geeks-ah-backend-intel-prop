export const up = (queryInterface, Sequelize) => queryInterface.createTable('Shares', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
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
  articleId: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: 'Articles',
      key: 'id'
    }
  },
  slug: {
    type: Sequelize.STRING,
  },
  platform: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['neutral']
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

export const down = queryInterface => queryInterface.dropTable('Shares');
