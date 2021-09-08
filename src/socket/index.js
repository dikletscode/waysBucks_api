// import models
const { User, Profile } = require("../../models");
// import here

// init variable here
const socket = (io) => {
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log(socket.id, "socket");
    socket.on("joinNotifications", (params, cb) => {
      socket.join(params.sender);
      console.log(params.sender, "ss");
      cb();
    });

    socket.on("sendNotifications", (request) => {
      io.to(request.reciever).emit("recieveNotifications", request);
    });

    socket.on("disconnect", () => {
      console.log("client disconnected", socket.id);
      // code here
    });
  });
};

module.exports = socket;
