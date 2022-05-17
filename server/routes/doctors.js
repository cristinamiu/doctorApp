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

// PATIENT REQUESTS

router.get("/get-patient/:userId", async (req, res) => {
  const doctor = await Patients.findOne({
    where: { UserId: req.params.userId },
    attributes: ["id"],
  });
  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  res.json(doctor);
});
// DOCTOR REQUESTS

router.get("/get-doc/:userId", async (req, res) => {
  const doctor = await Doctors.findOne({
    where: { UserId: req.params.userId },
    attributes: ["id"],
  });
  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  res.json(doctor);
});

router.get("/get-user/:patientId", async (req, res) => {
  const UserId = await Patients.findOne({
    where: { id: req.params.patientId },
    attributes: ["UserId"],
  });

  if (!UserId) {
    return res.status(404).json({ error: "User patient not found" });
  }
  const user = await Users.findByPk(UserId.UserId);
  if (!user) {
    return res.status(404).json({ error: "User patient not found" });
  }

  res.json(user);
});

router.get("/:doctorId/my-appointments", async (req, res) => {
  const myAppointments = await Appointments.findAll({
    where: { DoctorId: req.params.doctorId },
    include: { model: Patients },
  });

  return res.json(myAppointments);
});

router.get("/my-appointments/appointment/:appId", async (req, res) => {
  const myAppointments = await Appointments.findOne({
    where: { id: req.params.appId },
    include: { model: Patients },
  });

  return res.json(myAppointments);
});

router.get("/get-prescriptions/by-app/:appId", async (req, res) => {
  const myPrescriptions = await Prescriptions.findOne({
    where: { AppointmentId: req.params.appId },
  });

  return res.json(myPrescriptions);
});

router.get("/get-prescriptions/by-patient/:patientId", async (req, res) => {
  try {
    const patientApp = await Appointments.findAll({
      where: { PatientId: req.params.patientId },
      include: { model: Prescriptions },
    });
    return res.json(patientApp);
  } catch (error) {
    return res.status(404).json({ error: "Could not get diagnostic" + error });
  }
});

router.post("/add-prescription", async (req, res) => {
  const { observation, medication, dose, doctorId, appId } = req.body;

  try {
    Prescriptions.update(
      {
        AppointmentId: appId,
        observation: observation,
        medication: medication,
        dose: dose,
      },
      { where: { AppointmentId: appId } }
    ).then((result) => {
      Prescriptions.findOne({ where: { AppointmentId: appId } }).then(
        (resp) => {
          return res.json(resp);
        }
      );
    });
  } catch (error) {
    return res.status(404).json({ error: "Could not add diagnostic" + error });
  }
});

router.post("/add-diagnostic", async (req, res) => {
  const { content, doctorId, appId } = req.body;
  const field = await Doctors.findOne({
    where: { id: doctorId },
    attributes: ["department"],
  });

  try {
    Diagnostics.update(
      {
        AppointmentId: appId,
        [field.department]: content,
      },
      { where: { AppointmentId: appId } }
    ).then((result) => {
      Diagnostics.findOne({ where: { AppointmentId: appId } }).then((resp) => {
        return res.json(resp);
      });
    });
  } catch (error) {
    return res.status(404).json({ error: "Could not add diagnostic" + error });
  }
});

router.get("/get-diagnostics/by-patient/:patientId", async (req, res) => {
  try {
    const patientApp = await Appointments.findAll({
      where: { PatientId: req.params.patientId },
      include: { model: Diagnostics },
    });
    return res.json(patientApp);
  } catch (error) {
    return res.status(404).json({ error: "Could not get diagnostic" + error });
  }
});

router.get("/get-diagnostics/by-app/:appId", async (req, res) => {
  try {
    const patientApp = await Appointments.findAll({
      where: { id: req.params.appId },
      include: { model: Diagnostics },
    });
    return res.json(patientApp);
  } catch (error) {
    return res.status(404).json({ error: "Could not get diagnostic" + error });
  }
});

router.delete("/:doctorId/:appId/delete-appointment", async (req, res) => {
  const appointment = await Appointments.findOne({
    where: { id: req.params.appId },
  });

  if (!appointment) {
    return res.status(404).json({ error: "Appointment not found" });
  }

  appointment.destroy();

  return res.json("Success");
});

router.post("/new-appointment", (req, res) => {
  const { title, date, DoctorId, PatientId } = req.body;

  Appointments.create({
    title: title,
    date: date,
    DoctorId: DoctorId,
    PatientId: PatientId,
  }).then((result) => {
    Diagnostics.create({ AppointmentId: result.id });
    Prescriptions.create({ AppointmentId: result.id });

    return res.json(result);
  });
});

router.get("/:doctorId", async (req, res) => {
  const doctor = await Users.findOne({ where: { id: req.params.doctorId } });

  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  const users = await Users.findAll({
    where: { id: req.params.doctorId },
    include: {
      model: Doctors,
      attributes: ["userId", "department"],
      required: true,
    },
  });

  return res.json(users);
});

router.delete("/:doctorId", async (req, res) => {
  const doctor = await Users.findOne({ where: { id: req.params.doctorId } });

  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  await doctor.destroy();

  return res.json("Success");
});

router.put("/:doctorId/:appId/approve", async (req, res) => {
  try {
    const updatedApp = await Appointments.update(
      { status: "Approved", isApproved: true },
      { where: { id: req.params.appId } }
    );

    return res.json("Success");
  } catch (err) {
    console.error("There's an error" + err.message);
    return res.status(404).json({ error: "Doctor not found" });
  }
});

router.put("/:doctorId/:appId/complete", async (req, res) => {
  try {
    const updatedApp = await Appointments.update(
      { status: "Complete", isComplete: true },
      { where: { id: req.params.appId } }
    );

    return res.json("Success");
  } catch (err) {
    console.error("There's an error" + err.message);
    return res.status(404).json({ error: "Doctor not found" });
  }
});

router.get("/all-docs/:service", (req, res) => {
  Doctors.findAll({ where: { department: req.params.service } }).then(
    (response) => {
      return res.json(response);
    }
  );
});

router.post("/new", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { fName, lName, department } = req.body;
  const name = fName + " " + lName;
  const email =
    fName.toLowerCase() + "." + lName.toLowerCase() + "@" + department + ".com";
  const password = department;
  const role = "doctor";
  let id = 0;

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      name: name,
      email: email,
      password: hash,
      role: role,
    }).then((result) => {
      id = result.id;
      Doctors.create({ UserId: result.id, department: department, name: name });

      return res.json({
        id: id,
        name: name,
        email: email,
        role: role,
        department: department,
      });
    });
  });
});

module.exports = router;
