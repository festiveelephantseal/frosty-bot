import { Document } from "mongoose";

export interface IMuteSchema extends Document {
  guildID: string;
  role: string;
}
