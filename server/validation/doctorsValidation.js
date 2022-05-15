const isEmpty = require("./isEmpty");

const departments = [
  "cardiology",
  "neurology",
  "ophthalmology",
  "neurology",
  "dermatology",
  "urology",
  "oncology",
  "hepatology",
  "pneumology",
  "dentistry",
];
const validateRegisterInput = (data) => {
  let errors = {};

  // Check department field if necessary
  // Check role field
  if (!departments.includes(data.department)) {
    errors.department = "Department field is not valid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
