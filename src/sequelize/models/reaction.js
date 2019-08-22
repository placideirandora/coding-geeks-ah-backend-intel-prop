export default (sequelize, DataTypes) => {
  const Reaction = sequelize.define(
    'Reaction',
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
      likes: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      dislikes: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
    }, {
      timeStamps: true
    }
  );
  Reaction.associate = (models) => {
    Reaction.belongsTo(models.User, { foreignKey: 'userId', as: 'LikerOrDislker', onDelete: 'CASCADE' });
    Reaction.belongsTo(models.Article, { foreignKey: 'articleId', as: 'Article', onDelete: 'CASCADE' });
  };
  return Reaction;
};
