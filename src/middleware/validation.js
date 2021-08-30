const Joi = require("joi");

const schema = Joi.object({
  fullname: Joi.string().min(5).required(),
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
  role: Joi.number(),
});

exports.inputValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    console.log(error);
    res.status(422).send({
      error: {
        message: "invalid input",
      },
    });
  }
};
