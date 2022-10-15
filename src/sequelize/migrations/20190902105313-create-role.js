export const up = (queryInterface, Sequelize) => queryInterface.createTable('Roles', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  role: {
    allowNull: false,
    type: Sequelize.STRING
  }
},
{
  timestamps: false,
});

export const down = queryInterface => queryInterface.dropTable('Roles');
