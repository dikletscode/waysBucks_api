const { Router } = require("express");
const { register, login } = require("../controllers/auth");

const {
  transaction,
  getTransaction,
  createCart,
  getHistory,
  getGlobalTransaction,
  deleteProductCart,
  updateQty,
  updateTransaction,
} = require("../controllers/transaction");
const {
  getUser,
  deleteUser,
  getProfile,
  updateProfile,
} = require("../controllers/users");
const jwtVerify = require("../middleware/jwtVerify");
const multer = require("../middleware/multer");

const {
  inputValidation,
  loginValidation,
} = require("../middleware/validation");

const route = Router();

route.post("/register", inputValidation, register);
route.post("/login", loginValidation, login);
route.get("/users", getUser);
route.get("/profile", jwtVerify, getProfile);
route.delete("/users/:id", deleteUser);
route.patch("/user", multer.single("image"), jwtVerify, updateProfile);
route.post("/transaction", multer.single("image"), jwtVerify, transaction);
route.get("/transaction", jwtVerify, getTransaction);
route.get("/transactions", jwtVerify, getGlobalTransaction);
route.get("/orders", jwtVerify, getHistory);
route.post("/cart", jwtVerify, createCart);
route.delete("/transaction", jwtVerify, deleteProductCart);
route.patch("/transaction/:id", jwtVerify, updateQty);
route.patch("/transactions", jwtVerify, updateTransaction);
module.exports = route;
