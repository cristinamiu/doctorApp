const express = require("express");
const router = express.Router();
const { Users, Doctors } = require("../models");
const validateRegisterInput = require("../validation/doctorsValidation");
const bcrypt = require("bcrypt");

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

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      name: name,
      email: email,
      password: hash,
      role: role,
    }).then((result) => {
      Doctors.create({ UserId: result.id, department: department });
    });
    res.json("Success");
  });
});

module.exports = router;
