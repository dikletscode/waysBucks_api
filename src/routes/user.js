const { Router } = require("express");
const { register } = require("../controllers/auth");
const { inputValidation } = require("../middleware/validation");

const route = Router();

route.post("/register", inputValidation, register);

module.exports = route;
