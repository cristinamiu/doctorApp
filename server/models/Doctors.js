module.exports = (sequelize, DataTypes) => {
  const Doctors = sequelize.define("Doctors", {
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Doctors.associate = (models) => {
    Doctors.belongsToMany(models.Patients, {
      through: "Diagnostics",
    });
    Doctors.hasMany(models.Appointments, {
      ondelete: "cascade",
    });
  };

  return Doctors;
};
