module.exports = (sequelize, DataTypes) => {
  const Doctors = sequelize.define("Doctors", {
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Doctors.associate = (models) => {
    Doctors.belongsToMany(models.Patients, {
      through: "Diagnostics",
    });
    Doctors.belongsToMany(models.Patients, {
      through: "Appointments",
    });
  };

  return Doctors;
};
