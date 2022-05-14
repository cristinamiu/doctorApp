module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
    role: {
      type: DataTypes.STRING,
      defaultValue: "admin",
    },
  });

  return Admin;
};
