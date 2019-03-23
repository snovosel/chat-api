import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_name: { type: String, required: true, max: 100 },
  room_id: [{ type: Schema.Types.ObjectId, ref: "Room" }]
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
