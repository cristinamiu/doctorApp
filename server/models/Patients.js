module.exports = (sequelize, DataTypes) => {
  const Patients = sequelize.define("Patients", {
    role: {
      type: DataTypes.STRING,
      defaultValue: "patient",
    },
  });

  Patients.associate = (models) => {
    Patients.belongsToMany(models.Doctors, {
      through: "Diagnostics",
    });
    Patients.belongsToMany(models.Doctors, {
      through: "Appointments",
    });
  };
  return Patients;
};
