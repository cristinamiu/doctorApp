require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT);
  });
});
