export default (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    permission: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Permission.associate = (models) => {
    Permission.belongsTo(models.Role, { foreignKey: 'roleId', as: 'rolePermission' });
  };
  return Permission;
};
