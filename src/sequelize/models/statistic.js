export default (sequelize, DataTypes) => {
  const Statistic = sequelize.define(
    'Statistic',
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
      authorId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      reads: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
    }, {
      timeStamps: true
    }
  );
  Statistic.associate = (models) => {
    Statistic.belongsTo(models.User, { foreignKey: 'authorId', as: 'ArticleOwner', onDelete: 'CASCADE' });
    Statistic.belongsTo(models.Article, { foreignKey: 'articleId', as: 'ArticleStats', onDelete: 'CASCADE' });
  };
  return Statistic;
};
