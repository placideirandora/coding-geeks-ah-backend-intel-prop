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
    Follow.belongsTo(models.User, { foreignKey: 'follower', as: 'followerUser' });
    Follow.belongsTo(models.User, { foreignKey: 'following', as: 'followedUser' });
  };
  return Follow;
};
