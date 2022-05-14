// Checks if the requests come from an authenticated user
const { verify } = require("jsonwebtoken");
const { Users } = require("../models");

const validateToken = async (req, res, next) => {
  const token = req.cookies["access-token"];
  let isAuthed = false;

  if (token) {
    try {
      const { id } = verify(token, "a");
      console.log(id);

      try {
        const user = await Users.findByPk(id);

        if (user) {
          const userToReturn = { ...user.dataValues };
          delete userToReturn.password;
          req.user = userToReturn;
          isAuthed = true;
        }
      } catch (error) {
        isAuthed = false;
      }
    } catch (error) {
      isAuthed = false;
    }
  }

  if (isAuthed) {
    return next();
  } else {
    return res.json({ error: "Unauthorized" });
  }
};

module.exports = { validateToken };
