const { ValidationError } = require("sequelize");

exports.registerError = (err, res) => {
  if (err instanceof ValidationError) {
    if (err.errors[0].validatorKey == "not_unique") {
      return res.status(409).send({
        message: err.message,
      });
    }
  } else {
    console.log(err);
    return res.status(500).send({
      message: "internal server error",
    });
  }
};
