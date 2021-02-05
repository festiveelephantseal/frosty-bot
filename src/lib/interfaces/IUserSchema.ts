import { Document } from "mongoose";

export interface IUserSchema extends Document {
  userID: string;
  coins: number;
}
