export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
  });
  Role.associate = (models) => {
    Role.hasMany(models.Permission, { foreignKey: 'roleId', as: 'rolePermission', onDelete: 'CASCADE' });
  };
  return Role;
};
