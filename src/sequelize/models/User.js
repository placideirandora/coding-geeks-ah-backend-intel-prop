export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'user'
      },
      verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      bio: {
        allowNull: true,
        type: DataTypes.STRING
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Follow, { foreignKey: 'following', onDelete: 'CASCADE' });
    User.hasMany(models.Follow, { foreignKey: 'follower', onDelete: 'CASCADE' });
    User.hasMany(models.Article, { foreignKey: 'authorId', as: 'author', onDelete: 'CASCADE' });
  };
  return User;
};
