require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Routers
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const docRouter = require("./routes/doctors");
app.use("/doctors", docRouter);

const patRouter = require("./routes/patient");
app.use("/patients", patRouter);

const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT);
  });
});
