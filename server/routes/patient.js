const express = require("express");
const router = express.Router();
const {
  Users,
  Doctors,
  Patients,
  Appointments,
  Diagnostics,
  Prescriptions,
} = require("../models");
const validateRegisterInput = require("../validation/doctorsValidation");
const bcrypt = require("bcrypt");

router.get("/:patientId/my-appointments", async (req, res) => {
  const myAppointments = await Appointments.findAll({
    where: { PatientId: req.params.patientId },
    include: { model: Doctors },
  });

  return res.json(myAppointments);
});

router.get("/my-appointments/appointment/:appId", async (req, res) => {
  const myAppointments = await Appointments.findOne({
    where: { id: req.params.appId },
    include: { model: Doctors },
  });

  return res.json(myAppointments);
});

module.exports = router;
