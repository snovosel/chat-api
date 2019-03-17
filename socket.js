var { User } = require("./models/users.js");

exports.socket = server => {
  var io = require("socket.io")(server);

  io.on("connection", socket => {
    socket.on("room", ({ room, name }) => {
      User.findOne({ user_name: name }).exec((err, user) => {
        console.log("user", user);

        if (!user) {
          let newUser = new User({ user_name: name });
          newUser.save();
          socket.join(room);
          socket.emit("join");
        }

        if (user) {
          socket.emit("user_exists");
        }
      });
    });

    socket.on("message", ({ room, ...restData }) => {
      io.sockets.in(room).emit("message", restData);
    });

    socket.on("leave", room => {
      socket.leave(room);
    });
  });
};
