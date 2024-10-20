const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  //add new User
  socket.on("new-user-add", (newUserId) => {
    if (newUserId == null) {
         return
    }
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("User Connected", socket.id);
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => {
      return user.socketId !== socket.id;
    });
    console.log("User Disconnected", socket.id);
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { recieverId } = data;
    const user = activeUsers.find((user) => user.userId == recieverId);
    console.log("Sending From Socket to:", recieverId);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});
