export default (sequelize, DataTypes) => {
  const Highlight = sequelize.define(
    'Highlight',
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
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      text: {
        allowNull: false,
        type: DataTypes.STRING
      },
      startIndex: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      comment: {
        allowNull: true,
        type: DataTypes.STRING
      }
    },
    {
      timeStamps: true
    }
  );
  Highlight.associate = (models) => {
    Highlight.belongsTo(models.User, { foreignKey: 'userId' });
    Highlight.belongsTo(models.Article, { foreignKey: 'articleId' });
  };
  return Highlight;
};
