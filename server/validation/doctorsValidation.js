const isEmpty = require("./isEmpty");

const departments = ["cardiology", "neurology"];

const validateRegisterInput = (data) => {
  let errors = {};

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
