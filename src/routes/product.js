const { Router } = require("express");
const {
  createProducts,
  getProducts,
  getDetailProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/product");
const jwtVerify = require("../middleware/jwtVerify");

const multer = require("../middleware/multer");

const route = Router();

route.post("/product", multer.single("image"), jwtVerify, createProducts);
route.get("/products", getProducts);
route.get("/product/:id", getDetailProduct);
route.put("/product/:id", jwtVerify, editProduct);
route.delete("/product/:id", jwtVerify, deleteProduct);
module.exports = route;
