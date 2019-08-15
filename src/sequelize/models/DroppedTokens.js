export default (sequelize, DataTypes) => {
  const DroppedToken = sequelize.define(
    'DroppedToken',
    {
      identifier: {
        type: DataTypes.STRING,
        allowNull: false
      },
      invalidToken: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }
  );
  DroppedToken.associate = () => {
    // Association definitions here
  };
  return DroppedToken;
};
