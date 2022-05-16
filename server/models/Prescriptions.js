module.exports = (sequelize, DataTypes) => {
  const Prescriptions = sequelize.define("Prescriptions", {
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medication: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dose: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Prescriptions.associate = (models) => {
    Prescriptions.belongsTo(models.Appointments);
  };

  return Prescriptions;
};
