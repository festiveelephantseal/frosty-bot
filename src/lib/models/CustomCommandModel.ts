import { model, Schema } from "mongoose";
import { ICustomCommandSchema } from "../interfaces/ICustomCommandSchema";

const CustomCommandSchema = new Schema<ICustomCommandSchema>({
  guildID: { required: true, type: String },
  command: { required: true, type: String },
  content: { required: true, type: String },
});

export default model<ICustomCommandSchema>(
  "CustomCommand",
  CustomCommandSchema
);
