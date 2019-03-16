var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cors = require("cors");

app.use(cors());

let lastFiveMessages = [];

io.on("connection", socket => {
  socket.on("message", ({ room, ...restData }) => {
    io.sockets.in(room).emit("message", restData);
  });

  socket.on("room", room => {
    socket.join(room);
    socket.emit("join");
  });

  socket.on("leave", room => {
    socket.leave(room);
  });
});

http.listen(8080, function() {
  console.log("listening on *:8080");
});
