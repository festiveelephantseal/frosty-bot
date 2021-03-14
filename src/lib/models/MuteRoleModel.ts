import { Schema, model } from "mongoose";
import { IMuteSchema } from "../interfaces/IMuteSchema";

const MuteSchema = new Schema<IMuteSchema>({
  guildID: { required: true, type: String },
  role: { required: true, type: String },
});

export default model<IMuteSchema>("Mute", MuteSchema);
