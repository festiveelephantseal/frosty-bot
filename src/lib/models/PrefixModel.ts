import { Schema, model } from "mongoose";
import { IPrefixSchema } from "../interfaces/IPrefixSchema";

const PrefixSchema = new Schema<IPrefixSchema>({
  guildID: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
  },
});

export default model<IPrefixSchema>("Prefix", PrefixSchema);
