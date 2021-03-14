import { Schema, model } from "mongoose";
import { IWarningSchema } from "../interfaces/IWarningSchema";

const WarningSchema = new Schema<IWarningSchema>({
  guildID: { required: true, type: String },
  userID: { required: true, type: String },
  warns: { required: true, type: Array },
});

export default model<IWarningSchema>("Warning", WarningSchema);
