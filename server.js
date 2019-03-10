var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cors = require("cors");

app.use(cors());

// socket connection
io.on("connection", socket => {
  // broadcast any message sent through the socket
  socket.on("message", ({ room, ...restData }) =>
    io.sockets.in(room).emit("message", restData)
  );

  // join a room
  socket.on("room", room => {
    console.log("joining room...." + room);
    socket.join(room);
  });
});

http.listen(8080, function() {
  console.log("listening on *:8080");
});
