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
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const { insertMsg, findMsg } = require("./controllers/chat");

const users = {};
io.use((socket, next) => {
  const id = socket.handshake.auth.idUser;
  if (!id) {
    return next(new Error("invalid id"));
  }
  socket.idUser = id;
  next();
});
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

io.sockets.on("connection", function (socket) {
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
  users[socket.idUser] = socket.id;

  socket.emit("users", users);

  socket.broadcast.emit("user-connected", users);
  socket.on("load-message", async ({ id }) => {
    let data = await findMsg(id);
    socket.emit("load-message", data);
  });
  socket.on("private-message", async ({ content, to }) => {
    if (to && getKeyByValue(users, to) != undefined) {
      socket.to(to).emit("private-message", {
        content,
        from: getKeyByValue(users, socket.id),
      });
      await insertMsg(
        getKeyByValue(users, to),
        getKeyByValue(users, socket.id),
        content
      );
    }
  });
  socket.on("disconnect", () => {
    delete users[socket.idUser];
    io.emit("user has left", users);
  });
});
const cookieParser = require("cookie-parser");

app.use(cookieParser());

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
