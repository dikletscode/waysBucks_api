require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const user = require("./routes/user");
const topping = require("./routes/topping");
const product = require("./routes/product");
const app = express();

const server = http.createServer(app);
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // we must define cors because our client and server have diffe
  },
});
require("./socket")(io);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", user);
app.use("/api/v1", topping);
app.use("/api/v1", product);
server.listen(2021, () => {
  console.log("server running on http://localhost:2021");
});
