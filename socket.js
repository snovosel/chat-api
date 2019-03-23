import io from "socket.io";

import Room from "./models/rooms.js";

export default function socketListen(server) {
  const SocketIo = io(server);

  SocketIo.on("connection", socket => {
    socket.on("room", ({ room, name }) => {
      console.log("room", room);
      console.log("name", name);
      // User.findOne({ user_name: name }).exec((err, user) => {
      //   console.log("user", user);
      //
      //   if (!user) {
      //     let newUser = new User({ user_name: name });
      //     newUser.save();
      //     socket.join(room);
      //     socket.emit("join");
      //   }
      //
      //   if (user) {
      //     socket.emit("user_exists");
      //   }
      // });

      // Room.findOne({ room_name: room }, (err, room) => {
      //   if (err) console.log("err", err);
      //
      //   console.log("room", room);
      //
      //   if (!room) {
      //     let newRoom = new Room()
      //   }
      // });
      socket.name = name;
      socket.join(room);
      socket.emit("join");
    });

    socket.on("message", ({ room, ...restData }) => {
      // SocketIo.of('/').connected[socketId]

      const getSocket = async room => {
        await SocketIo.of("/")
          .in(room)
          .clients((err, clients) => clients[0]);
      };

      console.log("getSocket", getSocket(room));

      // const socketId = SocketIo.of("/")
      //   .in(room)
      //   .clients((err, clients) => clients[0]);

      // const jackSock = SocketIo.of("/").connected[socketId];
      //
      // console.log("jackSock", jackSock.name);

      SocketIo.sockets.in(room).emit("message", restData);
    });

    socket.on("leave", room => {
      socket.leave(room);
    });
  });
}
