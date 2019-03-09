var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cors = require('cors');

app.use(cors());

io.on('connection', socket => {
  socket.on('room', room => {
    socket.join(room);
    io.in(room).emit('alert', `whats up dawwwgs in ${room}`);
  });
});

io.on('message', socket => {
  console.log('socket', socket);
});

http.listen(8080, function() {
  console.log("listening on *:8080");
});
