const Validator = require("validator");
const isEmpty = require("./isEmpty");

const roles = ["admin", "patient", "doctor"];
const departments = ["cardiology", "neurology"];

const validateRegisterInput = (data) => {
  let errors = {};

  // Check email field
  if (isEmpty(data.email)) {
    errors.email = "Email field cannot be empty";
  } else if (!Validator.isEmail(data.email) && data.email !== "admin") {
    errors.email = "Please provide a valid email";
  }

  //   Check password field
  if (isEmpty(data.password)) {
    errors.password = "Password field cannot be empty";
  } else if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
    errors.password = "Password must be between 4 and 30 characters long";
  }

  //   Check name field
  if (isEmpty(data.name)) {
    errors.name = "Name field cannot be empty";
  } else if (!Validator.isLength(data.name, { min: 5, max: 30 })) {
    errors.name = "Name must be between 5 and 30 characters long";
  }

  //   Check confirm password field
  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password field cannot be empty";
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password fields must match";
  }

  // Check role field
  if (!isEmpty(data.role) && !roles.includes(data.role)) {
    errors.role = "Role field is not valid";
  }

  // Check department field if necessary
  // Check role field
  if (!isEmpty(data.department) && !departments.includes(data.department)) {
    errors.department = "Department field is not valid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
