require("dotenv").config();
const express = require("express");
const http = require("http");
const user = require("./routes/user");
const topping = require("./routes/topping");
const product = require("./routes/product");
const port = process.env.PORT || 2021;
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

io.on("connection", (socket) => {
  socket.on("addUsers", (userId) => {
    users.push({
      userId,
      socketId: socket.id,
    }) && !users.some((user) => user.userId === userId);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text, room }) => {
    let matchUser = users.find((user) => user.userId == receiverId);
    io.to(socket.id).to(matchUser.socketId).emit("getMessage", {
      senderId,
      receiverId,
      text,
      room,
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    let user = users.filter((item) => item.socketId == socket.id);
    io.emit("getUsers", user);
  });
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", user);
app.use("/api/v1", topping);
app.use("/api/v1", product);
server.listen(port, () => {
  console.log("server running on http://localhost:" + port);
});
