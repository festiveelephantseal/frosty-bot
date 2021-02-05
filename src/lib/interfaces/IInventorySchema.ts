import { Document } from "mongoose";

export interface IInventorySchema extends Document {
  userID: string;
  items: [{ item: string; amount: number }];
}
