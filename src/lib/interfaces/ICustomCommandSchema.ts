import { Document } from "mongoose";

export interface ICustomCommandSchema extends Document {
  guildID: String;
  command: String;
  content: String;
}
