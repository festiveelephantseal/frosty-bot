import { Document } from "mongoose";

export interface ISchema extends Document {
  guildID: string;
  logChannel: string;
}
