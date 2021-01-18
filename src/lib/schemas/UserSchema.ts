import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
    required: true,
  },
});

export default model("User", UserSchema);
