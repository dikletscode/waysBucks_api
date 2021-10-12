// module.exports = { addUser, removeUser, getUser };
// io.on("connection", (socket) => {
//     socket.on("addUser", (userId) => {
//       users.push({
//         userId,
//         socketId: socket.id,
//       }) && !users.some((user) => user.userId === userId);
//       io.emit("getUsers", users);
//     });

//     socket.on("sendMessage", ({ senderId, receiverId, text, room }) => {
//       let matchUser = users.find((user) => user.userId === receiverId);
//       io.to(socket.id).to(matchUser.socketId).emit("getMessage", {
//         senderId,
//         receiverId,
//         text,
//         room,
//       });
//     });

//     socket.on("disconnect", () => {
//       console.log("a user disconnected!");
//       removeUser(socket.id);
//       io.emit("getUsers", users);
//     });
//   });
