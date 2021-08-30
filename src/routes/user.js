const { Router } = require("express");
const { register, login } = require("../controllers/auth");
const {
  createProducts,
  getProducts,
  getDetailProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/product");
const {
  createTopping,
  getToppins,
  getDetailTopping,
  editTopping,
  deleteTopping,
} = require("../controllers/topping");
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
route.post("/product", createProducts);
route.get("/products", getProducts);
route.get("/product/:id", getDetailProduct);
route.put("/product/:id", editProduct);
route.delete("/product/:id", deleteProduct);
route.post("/topping", createTopping);
route.get("/toppings", getToppins);
route.get("/topping/:id", getDetailTopping);
route.put("/topping/:id", editTopping);
route.delete("/topping/:id", deleteTopping);
module.exports = route;
