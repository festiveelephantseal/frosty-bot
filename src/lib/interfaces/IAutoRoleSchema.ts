import { Document } from "mongoose";

export interface IAutoRoleSchema extends Document {
  guildID: string;
  roles: string[];
}
