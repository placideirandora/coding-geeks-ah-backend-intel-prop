export default(sequelize, DataTypes) => {
  const Follow = sequelize.define(
    'Follow',
    {
      follower: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      following: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
  );
  Follow.associate = (models) => {
    // associations can be defined here
    Follow.belongsTo(models.User, { foreignKey: 'follower', onDelete: 'CASCADE' });
    Follow.belongsTo(models.User, { foreignKey: 'following', onDelete: 'CASCADE' });
  };
  return Follow;
};
