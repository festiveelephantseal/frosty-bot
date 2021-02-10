import { Document } from "mongoose";

export interface InventorySchema extends Document {
  userID: string;
  items: Array<string>;
}
