import { Document } from "mongoose";

export interface IPrefixSchema extends Document {
  guildID: string;
  prefix: string;
}
