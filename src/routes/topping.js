const { Router } = require("express");

const {
  createTopping,
  getToppins,
  getDetailTopping,
  editTopping,
  deleteTopping,
} = require("../controllers/topping");
const multer = require("../middleware/multer");

const route = Router();

route.post("/topping", multer.single("image"), createTopping);
route.get("/toppings", getToppins);
route.get("/topping/:id", getDetailTopping);
route.put("/topping/:id", editTopping);
route.delete("/topping/:id", deleteTopping);

module.exports = route;
