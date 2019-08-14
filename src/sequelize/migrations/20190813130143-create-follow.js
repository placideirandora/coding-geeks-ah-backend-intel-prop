export const up = (queryInterface, Sequelize) => queryInterface.createTable('Follows', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  follower: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  following: {
    allowNull: false,
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
});

export const down = queryInterface => queryInterface.dropTable('Fellows');
