module.exports = (sequelize, DataTypes) => {
  const CommentReaction = sequelize.define('CommentReaction', {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dislikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timeStamps: true,
  });
  CommentReaction.associate = (models) => {
    CommentReaction.belongsTo(models.Comment, { foreignKey: 'commentId' });
    CommentReaction.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return CommentReaction;
};
