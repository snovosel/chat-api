const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  room_name: { type: String, required: true, max: 100 }
});

const RoomModel = mongoose.model("User", RoomSchema);

export default RoomModel;
