const { Router } = require("express");
const {
  register,
  login,
  refreshTokenRoute,
  logout,
  refreshToken,
  getUserForVerify,
} = require("../controllers/auth");
const { chat, getChat, sendNotif, findNotif } = require("../controllers/chat");

const {
  transaction,
  getTransaction,
  createCart,
  getHistory,
  getGlobalTransaction,
  deleteProductCart,
  updateQty,
  updateTransaction,
  detailHistory,
  bestProduct,
  midtransTransac,
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
route.get("/users", jwtVerify, getUser);
route.get("/user", jwtVerify, getProfile);
route.delete("/users/:id", deleteUser);
route.patch("/user", multer.single("image"), jwtVerify, updateProfile);
route.post("/transaction", multer.single("image"), jwtVerify, transaction);
route.post("/midtrans", jwtVerify, midtransTransac);
route.get("/transaction", jwtVerify, getTransaction);
route.get("/transactions", jwtVerify, getGlobalTransaction);
route.get("/orders", jwtVerify, getHistory);
route.get("/orders/:id", jwtVerify, detailHistory);
route.post("/cart", jwtVerify, createCart);
route.delete("/transaction", jwtVerify, deleteProductCart);
route.patch("/transaction/:id", jwtVerify, updateQty);
route.patch("/transactions", jwtVerify, updateTransaction);
route.get("/count", bestProduct);
route.patch("/chat", jwtVerify, chat);
route.post("/notification", jwtVerify, sendNotif);
route.get("/notification", jwtVerify, findNotif);
route.get("/chat", jwtVerify, getChat);
module.exports = route;
