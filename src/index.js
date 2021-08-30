require("dotenv").config();
const express = require("express");

const user = require("./routes/user");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", user);

app.listen(2021, () => {
  console.log("server running on http://localhost:2021");
});
