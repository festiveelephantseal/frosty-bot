import { Schema, model } from "mongoose";
import { ISchema } from "../interfaces/ILogChannelSchema";

const LogChannel = new Schema<ISchema>({
  guildID: {
    type: String,
    required: true,
  },
  logChannel: {
    type: String,
    required: true,
  },
});

export default model("LogChannel", LogChannel);
