const { Router } = require("express");
const { register, login } = require("../controllers/auth");
const { getUser, deleteUser } = require("../controllers/users");
const {
  inputValidation,
  loginValidation,
} = require("../middleware/validation");

const route = Router();

route.post("/register", inputValidation, register);
route.post("/login", loginValidation, login);
route.get("/users", getUser);
route.delete("/users/:id", deleteUser);
module.exports = route;
