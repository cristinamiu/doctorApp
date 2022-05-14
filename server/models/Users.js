module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: true, default: "pacient" },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Patients, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Doctors, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Admin, {
      onDelete: "cascade",
    });
  };

  return Users;
};
