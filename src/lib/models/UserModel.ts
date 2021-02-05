import { Schema, model } from "mongoose";
import { IUserSchema } from "../interfaces/IUserSchema";

const UserSchema = new Schema<IUserSchema>({
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
