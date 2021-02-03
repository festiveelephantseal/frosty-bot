import { Document } from "mongoose";

export interface IWarningSchema extends Document {
  guildID: string;
  userID: string;
  warns: [{ moderator: string; reason: string }];
}
