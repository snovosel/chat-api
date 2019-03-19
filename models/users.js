const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  user_name: { type: String, required: true, max: 100 }
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
