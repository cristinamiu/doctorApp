module.exports = (sequelize, DataTypes) => {
  const Prescriptions = sequelize.define("Prescriptions", {
    observation: {
      type: DataTypes.STRING,
      allowNull: false,
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
    Prescriptions.belongsToMany(models.Diagnostics, {
      through: "Appointments",
      onDelete: "cascade",
    });
  };

  return Prescriptions;
};
