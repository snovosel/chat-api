import http from "http";

import socketListen from "./socket.js";
import { connectDb } from "./dbConfig.js";

const server = http.Server();

connectDb(() => {
  socketListen(server);
  server.listen(8080, function() {
    console.log("listening on *:8080");
  });
});
