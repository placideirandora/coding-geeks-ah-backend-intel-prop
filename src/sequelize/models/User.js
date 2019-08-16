export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'user',
      },
      verified: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      socialid: {
        allowNull: true,
        type: DataTypes.STRING
      },
      platform: {
        allowNull: true,
        type: DataTypes.STRING
      },
    },
    {
      timestamps: false,
    }
  );

  User.associate = () => {
    // Association definitions here
  };
  return User;
};
