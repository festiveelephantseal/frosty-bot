import { model, Schema } from "mongoose";
import { IAutoRoleSchema } from "../interfaces/IAutoRoleSchema";

const AutoRoleSchema = new Schema<IAutoRoleSchema>({
  guildID: { required: true, type: String },
  roles: { required: true, type: Array },
});

export default model<IAutoRoleSchema>("AutoRole", AutoRoleSchema);
