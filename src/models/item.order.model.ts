import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

interface IItemOrder extends Document {
   products: string,
   unit: string,
   quantity: number,
   priceTotal: number
}

interface ItemOrderDocument extends mongoose.Document {
   products: string,
   unit: string,
   quantity: number
   priceTotal: number
}

interface OrderModelInterface extends mongoose.Model<ItemOrderDocument> {
    build(attr: IItemOrder): ItemOrderDocument;
}

const ItemOrderSchema = new Schema(
    {
      product: {
         type: mongoose.Types.ObjectId,
         ref: "Product",
         required: true
      },
      unit: {
         type: mongoose.Types.ObjectId,
         ref: "Unit",
         required: true
      },
      quantity: {
         type: Number,
         required: true
      },
      priceTotal: {
         type: Number,
         required: true
      }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ItemOrderModel = mongoose.model<ItemOrderDocument, OrderModelInterface>("ItemOrder", ItemOrderSchema);
export { ItemOrderModel, ItemOrderSchema };
