const { Router } = require("express");

const {
  createTopping,

  getDetailTopping,
  editTopping,
  deleteTopping,
  getToppings,
} = require("../controllers/topping");
const jwtVerify = require("../middleware/jwtVerify");
const multer = require("../middleware/multer");

const route = Router();

route.post("/topping", multer.single("image"), jwtVerify, createTopping);
route.get("/toppings", getToppings);
route.get("/topping/:id", getDetailTopping);
route.put("/topping/:id", jwtVerify, editTopping);
route.delete("/topping/:id", jwtVerify, deleteTopping);

module.exports = route;
