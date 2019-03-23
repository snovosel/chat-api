var mongoose = require("mongoose");

// db connection -------------------------------------------------------
exports.connectDb = callBack => {
  mongoose.connect(
    "mongodb+srv://snovosel:Flwr1281!@psst-ombxx.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true },
    err => {
      if (err) {
        console.log("Some problem with the connection " + err);
      } else {
        console.log("The Mongoose connection is ready");
        callBack();
      }
    }
  );

  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};
