module.exports = (sequelize, DataTypes) => {
  const Appointments = sequelize.define("Appointments", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Appointment",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },
  });

  Appointments.associate = (models) => {
    Appointments.hasMany(models.Prescriptions, {
      onDelete: "cascade",
    });
    Appointments.belongsTo(models.Patients);
    Appointments.belongsTo(models.Doctors);
  };

  return Appointments;
};
