export default (sequelize, DataTypes) => {
  const CommentHistory = sequelize.define(
    'CommentHistory',
    {
      userId: {
        type: DataTypes.INTEGER
      },
      articleSlug: {
        allowNull: false,
        type: DataTypes.STRING
      },
      commentId: {
        type: DataTypes.INTEGER
      },
      editedComment: {
        type: DataTypes.STRING
      }
    }, {
      timeStamps: true
    }
  );
  CommentHistory.associate = (models) => {
    CommentHistory.belongsTo(models.Comment, {
      foreignKey: 'commentId', as: 'parentComment', targetKey: 'id', onUpdate: 'CASCADE', onDelete: 'CASCADE'
    });
  };
  return CommentHistory;
};
