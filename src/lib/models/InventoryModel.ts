import { model, Schema } from "mongoose";
import { InventorySchema } from "../interfaces/IInventorySchema";

const InventorySchema = new Schema<InventorySchema>({
  userID: { required: true, type: String },
  items: { required: true, type: Array },
});

export default model("Inventory", InventorySchema);
