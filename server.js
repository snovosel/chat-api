var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cors = require("cors");

app.use(cors());

let lastFiveMessages = [];

// socket connection
io.on("connection", socket => {
  // broadcast any message sent through the socket
  socket.on("message", ({ room, ...restData }) => {
    if (lastFiveMessages.length === 4) {
      lastFiveMessages = [];
    }

    lastFiveMessages.push(restData);
    console.log("ON MESSAGE", lastFiveMessages);
    io.sockets.in(room).emit("message", restData);
  });

  // join a room
  socket.on("room", room => {
    socket.join(room);
    console.log("ON JOIN", lastFiveMessages);
    socket.emit("join", lastFiveMessages);
  });

  socket.on("leave", room => {
    socket.leave(room);
  });
});

http.listen(8080, function() {
  console.log("listening on *:8080");
});
