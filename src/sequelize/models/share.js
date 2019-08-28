export default (sequelize, DataTypes) => {
  const Share = sequelize.define(
    'Share',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      articleId: {
        type: DataTypes.INTEGER
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },
      platform: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: ['neutral']
      },
    }
  );
  Share.associate = (models) => {
    // Association definitions here
    Share.belongsTo(models.User, {
      foreignKey: 'userId', as: 'author', onDelete: 'CASCADE', onUpdate: 'CASCADE'
    });
    Share.belongsTo(models.Article, {
      foreignKey: 'articleId', as: 'Article', onDelete: 'CASCADE', onUpdate: 'CASCADE'
    });
  };
  return Share;
};
