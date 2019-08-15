export const up = (queryInterface, Sequelize) => queryInterface.createTable('DroppedTokens', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  identifier: {
    allowNull: false,
    unique: true,
    type: Sequelize.STRING
  },
  invalidToken: {
    allowNull: false,
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

export const down = queryInterface => queryInterface.dropTable('DroppedTokens');
