export default (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }
  );
  Rating.associate = (models) => {
    // Association definitions here
    Rating.belongsTo(models.User, {
      foreignKey: 'reviewerId', as: 'author', onDelete: 'CASCADE', onUpdate: 'CASCADE'
    });
    Rating.belongsTo(models.Article, {
      foreignKey: 'articleId', onDelete: 'CASCADE', onUpdate: 'CASCADE'
    });
  };
  return Rating;
};
