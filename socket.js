import { Room, Message, Leave } from "./controllers/SocketController.js";

export function startSocket(io) {
  // io.on("connection", socket => {
  //   socket.on("room", {});
  //   socket.on("room", ({ room, name }) => {
  //     socket.join(room);
  //     socket.emit("join");
  //   });
  //   socket.on("message", ({ room, ...restData }) =>
  //     io.sockets.in(room).emit("message", restData)
  //   );
  //   socket.on("leave", room => socket.leave(room));
  // });

  io.on("connection", socket => {
    var eventHandlers = {
      room: new Room(socket),
      message: new Message(socket),
      leave: new Leave(socket)
    };

    for (let category in eventHandlers) {
      let handler = eventHandlers[category].handler;
      for (var event in handler) {
        socket.on(event, handler[event]);
      }
    }
  });
}
