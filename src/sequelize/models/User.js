export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  },
  {
    timestamps: false,
<<<<<<< HEAD
<<<<<<< HEAD
  });
=======
  },);
>>>>>>> feat(signup endpoint): user should signup
=======
  });
>>>>>>> feat(User validation): Validate user upon registration
  User.associate = () => {
    // Association definitions here
  };
  return User;
};
