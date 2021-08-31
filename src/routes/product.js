const { Router } = require("express");
const {
  createProducts,
  getProducts,
  getDetailProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/product");

const multer = require("../middleware/multer");

const route = Router();

route.post("/product", multer.single("image"), createProducts);
route.get("/products", getProducts);
route.get("/product/:id", getDetailProduct);
route.put("/product/:id", editProduct);
route.delete("/product/:id", deleteProduct);
module.exports = route;
