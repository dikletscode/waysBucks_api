require("dotenv").config();
const express = require("express");

const user = require("./routes/user");
const topping = require("./routes/topping");
const product = require("./routes/product");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", user);
app.use("/api/v1", topping);
app.use("/api/v1", product);
app.listen(2021, () => {
  console.log("server running on http://localhost:2021");
});
