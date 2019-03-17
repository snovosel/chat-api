var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  user_name: { type: String, required: true, max: 100 }
});

exports.User = mongoose.model("User", UserSchema);
