export default (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      articleId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      articleSlug: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      comment: {
        allowNull: false,
        type: DataTypes.STRING
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      dislikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    }, {
      timeStamps: true
    }
  );
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'Commenter', onDelete: 'CASCADE' });
    Comment.belongsTo(models.Article, { foreignKey: 'articleId', as: 'ArticleComment', onDelete: 'CASCADE' });
    Comment.hasMany(models.CommentReaction, { foreignKey: 'commentId', onDelete: 'CASCADE' });
  };
  return Comment;
};
