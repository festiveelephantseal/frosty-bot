import { Schema, model } from "mongoose";

const LogChannel = new Schema({
  guildID: {
    type: String,
    required: true
  },
  logChannel: {
    type: String,
    required: true,
  },
});

export default model("LogChannel", LogChannel);
