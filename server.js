const express = require("express");
const bodyParser = require("body-parser");
// var http = require("http").Server(app);

const app = express();

// var { socket } = require("./socket.js");
// var { connectDb } = require("./dbConfig.js");

// socket(http);
// connectDb();

// for ability to read from body
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("get");
});

app.post("/", (req, res) => {
  console.log("req body", req.body);
});

app.listen("8080", () => console.log(`Example app listening on port 8080!`));

// http.listen(8080, function() {
//   console.log("listening on *:8080");
// });
