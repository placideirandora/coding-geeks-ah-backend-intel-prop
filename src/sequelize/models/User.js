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
        allowNull: true,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
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
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      socialid: {
        allowNull: true,
        type: DataTypes.STRING
      },
      platform: {
        allowNull: true,
        type: DataTypes.STRING
      },
      bio: {
        allowNull: true,
        type: DataTypes.STRING
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      notify: {
        allownull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      }
    },
    {
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Follow, { foreignKey: 'follower', onDelete: 'CASCADE' });
    User.hasMany(models.Article, { foreignKey: 'authorId', as: 'author', onDelete: 'CASCADE' });
    User.hasMany(models.Notification, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Reaction, { foreignKey: 'userId', as: 'LikerOrDisliker', onDelete: 'CASCADE' });
    User.hasMany(models.Comment, { foreignKey: 'userId', as: 'Commenter', onDelete: 'CASCADE' });
    User.hasMany(models.Bookmark, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Report, { foreignKey: 'reporterId', as: 'reporter', onDelete: 'CASCADE' });
    User.hasMany(models.CommentReaction, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };
  return User;
};
