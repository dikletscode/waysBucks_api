const Joi = require("joi");

const schema = Joi.object({
  fullname: Joi.string().min(5).required(),
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
});

exports.inputValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const msg = error.message.replace(/"/g, `'`);
    res.status(422).send({
      message: msg,
    });
  }
};

exports.loginValidation = (req, res, next) => {
  const { error } = schemaLogin.validate(req.body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const msg = error.message.replace(/"/g, `'`);
    res.status(422).send({
      message: msg,
    });
  }
};
exports.passwordValidation = (req, res, next) => {
  const { error } = schemaResetPsw.validate(req.body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const msg = error.message.replace(/"/g, `'`);
    res.status(422).send({
      message: msg,
    });
  }
};
