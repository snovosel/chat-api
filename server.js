var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cors = require('cors');

app.use(cors());

io.on('connection', socket => {
  socket.on('room', room => {
    console.log('rooms', socket.rooms);
    socket.join(room);
    io.in(room).emit('message', `whats up dawwwgs in ${room}`);
  });
});

http.listen(8080, function() {
  console.log("listening on *:8080");
});
