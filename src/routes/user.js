const { Router } = require("express");
const { register, login } = require("../controllers/auth");
const {
  inputValidation,
  loginValidation,
} = require("../middleware/validation");

const route = Router();

route.post("/register", inputValidation, register);
route.post("/login", loginValidation, login);
module.exports = route;
