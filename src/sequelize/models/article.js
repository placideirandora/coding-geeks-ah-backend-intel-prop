import eventEmitter from '../../helpers/notification/eventEmitter';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      tagList: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      images: {
        type: DataTypes.STRING,
        allowNull: true
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      dislikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },
    {
      timeStamps: true,
      hooks: {
        afterCreate: article => eventEmitter.emit('newArticle', article)
      }
    }
  );
  Article.associate = (models) => {
    Article.belongsTo(models.User, { foreignKey: 'authorId', as: 'author', onDelete: 'CASCADE' });
    Article.hasMany(models.Reaction, { foreignKey: 'articleId', as: 'Article', onDelete: 'CASCADE' });
    Article.hasMany(models.Comment, { foreignKey: 'articleId', as: 'ArticleComment', onDelete: 'CASCADE' });
    Article.hasMany(models.Bookmark, { foreignKey: 'articleId', onDelete: 'CASCADE' });
    Article.hasMany(models.Highlight, { foreignKey: 'articleId', onDelete: 'CASCADE' });
    Article.hasMany(models.Statistic, { foreignKey: 'articleId', as: 'ArticleStats', onDelete: 'CASCADE' });
    Article.hasMany(models.Report, { foreignKey: 'articleId', as: 'reportedArticle', onDelete: 'CASCADE' });
  };
  return Article;
};
