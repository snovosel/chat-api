import Room from "./models/rooms.js";

export function startSocket(io) {
  io.on("connection", socket => {
    socket.on("room", ({ room, name }) => {
      Room.socket.join(room);
      socket.emit("join");
    });

    socket.on("message", ({ room, ...restData }) =>
      io.sockets.in(room).emit("message", restData)
    );

    socket.on("leave", room => socket.leave(room));
  });
}
