const express = require("express");
const router = express.Router();
const { Users, Admin, Doctors, Patients } = require("../models");
const bcrypt = require("bcrypt");
const validateRegisterInput = require("../validation/authValidation");
const { sign } = require("jsonwebtoken");
const isEmpty = require("../validation/isEmpty");
const { validateToken } = require("../middlewares/authMiddleware");

router.post("/", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check for existing user
  const existingEmail = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (existingEmail) {
    return res
      .status(400)
      .json({ error: "There is already a user with this email" });
  }

  const { name, email, password } = req.body;
  let { role } = req.body;

  if (isEmpty(role)) {
    role = "patient";
  }

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      name: name,
      email: email,
      password: hash,
      role: role,
    }).then((result) => {
      if (result.role === "admin") {
        Admin.create({ id: result.id });
      } else if (result.role === "doctor") {
        Doctors.create({ id: result.id });
      } else if (result.role === "patient") {
        Patients.create({ id: result.id });
      }
    });

    res.json("Success");
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        return res.status(401).json({ error: "Wrong username or password" });
      }

      req.user = { id: user.id, role: user.role };
      const accessToken = sign(
        { email: user.email, id: user.id, role: user.role },
        "a"
      );

      res.json({
        accessToken: accessToken,
        email: user.email,
        role: user.role,
        id: user.id,
      });
    });
  }
});

router.get("/current", validateToken, (req, res) => {
  // if (!req.user) {
  //   return res.json({ error: "Unauthorized" });
  // } else {
  return res.json(req.user);
  // }
});

module.exports = router;
