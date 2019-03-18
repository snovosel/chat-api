const http = require("http").Server();
const io = require("socket.io")(http);

const { startSocket } = require("./socket.js");
const { connectDb } = require("./dbConfig.js");

// new socket(io);
startSocket(io);
connectDb();

http.listen(8080, function() {
  console.log("listening on *:8080");
});
