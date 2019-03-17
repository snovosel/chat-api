var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");

// db connection -------------------------------------------------------

mongoose.connect(
  "mongodb+srv://snovosel:Flwr1281!@psst-ombxx.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log("Some problem with the connection " + err);
    } else {
      console.log("The Mongoose connection is ready");
    }
  }
);

//Get the default connection
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// models -----------------------------------------------------

//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  user_name: { type: String, required: true, max: 100 }
});

const User = mongoose.model("User", UserSchema);

// ------ web socket ------------------------

io.on("connection", socket => {
  socket.on("room", ({ room, name }) => {
    let user = new User({ user_name: name });
    const findUser = async function(params) {
      try {
        return await User.find(params);
      } catch (err) {
        console.log(err);
      }
    };

    const users = findUser();
    console.log("users", users);
    socket.join(room);
    socket.emit("join");
  });

  socket.on("message", ({ room, ...restData }) => {
    io.sockets.in(room).emit("message", restData);
  });

  socket.on("leave", room => {
    socket.leave(room);
  });
});

http.listen(8080, function() {
  console.log("listening on *:8080");
});
