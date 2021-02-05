import { Schema, model } from "mongoose";
import { IInventorySchema } from "../interfaces/IInventorySchema";

const InventorySchema = new Schema<IInventorySchema>({
  userID: { required: true, type: String },
  items: { required: true, type: [{ item: String, amount: Number }] },
});

export default model("Inventory", InventorySchema);
