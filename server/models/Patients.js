module.exports = (sequelize, DataTypes) => {
  const Patients = sequelize.define("Patients", {
    role: {
      type: DataTypes.STRING,
      defaultValue: "patient",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Patients.associate = (models) => {
    Patients.hasMany(models.Appointments, {
      onDelete: "cascade",
    });
  };
  return Patients;
};
