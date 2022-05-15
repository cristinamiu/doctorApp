const express = require("express");
const router = express.Router();
const { Users, Doctors } = require("../models");
const validateRegisterInput = require("../validation/doctorsValidation");
const bcrypt = require("bcrypt");

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
      Doctors.create({ UserId: result.id, department: department });

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
