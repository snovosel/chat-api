// const { User } = require("./models/users.js");
//
// exports.socketController = socket => {
//   socket.on("room", ({ room, name }) => {
//     User.findOne({ user_name: name }).exec((err, user) => {
//       console.log("user", user);
//
//       if (!user) {
//         let newUser = new User({ user_name: name });
//         newUser.save();
//         socket.join(room);
//         socket.emit("join");
//       }
//
//       if (user) {
//         socket.emit("user_exists");
//       }
//     });
//   });
//
//   socket.on("message", ({ room, ...restData }) => {
//     io.sockets.in(room).emit("message", restData);
//   });
//
//   socket.on("leave", room => {
//     socket.leave(room);
//   });
// };
//
// module.exports = {
//   joinRoom = ({ room, name }) => {
//     User.findOne({ user_name: name }).exec((err, user) => {
//       console.log("user", user);
//
//       if (!user) {
//         let newUser = new User({ user_name: name });
//         newUser.save();
//         socket.join(room);
//         socket.emit("join");
//       }
//
//       if (user) {
//         socket.emit("user_exists");
//       }
//     });
//   }
//
//   sendMessage = ({ room, ...restData }) => {
//     io.sockets.in(room).emit("message", restData);
//   }
// }
//
// exports.socketController = (socket, io) => {
//   socket.on("room", )
// }

export class Room {
  constructor(socket) {
    this.socket = socket;
    this.join = this.join.bind(this);

    this.handler = {
      join: this.join
    };
  }

  join({ room, name }) {
    console.log("room", room);
    console.log("name", name);
    this.socket.join(room);
    this.socket.emit("join");
  }
}

export class Message {
  constructor(socket) {
    this.socket = socket;
    this.message = this.message.bind(this);

    this.handler = {
      message: this.message
    };
  }

  message({ room }) {
    //io.sockets.in(room).emit("message", restData);
    console.log("room", room);
  }
}

export class Leave {
  constructor(socket) {
    this.socket = socket;
    this.leave = this.leave.bind(this);

    this.handler = {
      leave: this.leave
    };
  }

  leave(room) {
    this.socket.leave(room);
  }
}
