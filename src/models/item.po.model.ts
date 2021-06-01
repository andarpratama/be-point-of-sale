import mongoose, { Schema } from "mongoose";
import { IItemPO } from "../interfaces/IItemPO";
import { IItemPODocument } from "../interfaces/IItemPO.mongoose";

interface PoModelInterface extends mongoose.Model<IItemPODocument> {
    build(attr: IItemPO): IItemPODocument;
}

const ItemPurchaseSchema = new Schema(
    {
      product: {
         type: mongoose.Types.ObjectId,
         ref: "Product",
      },
      unit: {
         type: mongoose.Types.ObjectId,
         ref: "Unit",
      },
      quantity: {
         type: Number,
         required: true
      },
      buyPrice: {
         type: Number,
         required: true
      },
      totalPrice: {
         type: Number,
         required: true
      },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ItemPurchaseOrderModel = mongoose.model<IItemPODocument, PoModelInterface>("ItemPurchaseOrder", ItemPurchaseSchema);
export { ItemPurchaseOrderModel };
