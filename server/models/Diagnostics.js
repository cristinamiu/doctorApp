module.exports = (sequelize, DataTypes) => {
  const Diagnostics = sequelize.define("Diagnostics", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cardiology: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Not diagnosed",
    },

    ophthalmology: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Not diagnosed",
    },
    neurology: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Not diagnosed",
    },
    dermatology: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Not diagnosed",
    },
    urology: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Not diagnosed",
    },
    oncology: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Not diagnosed",
    },
    hepatology: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Not diagnosed",
    },
    dentistry: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Not diagnosed",
    },
    pneumology: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Not diagnosed",
    },
  });

  return Diagnostics;
};
