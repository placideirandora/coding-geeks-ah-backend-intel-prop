export const up = (queryInterface, Sequelize) => queryInterface.createTable('Users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  firstName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  lastName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  userName: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true,
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  role: {
    allowNull: false,
    type: Sequelize.STRING,
    defaultValue: 'user',
  },
  verified: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
}, {
  timestamps: false,
});

export const down = queryInterface => queryInterface.dropTable('Users');
