import mongoose, { Schema } from "mongoose";
import { IItemDO } from "../interfaces/IItemDO";
import { IItemDODocument } from "../interfaces/IItemDO.mongoose";

interface DoModelInterface extends mongoose.Model<IItemDODocument> {
    build(attr: IItemDO): IItemDODocument;
}

const ItemDeliverySchema = new Schema(
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
      }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ItemDeliveryOrderModel = mongoose.model<IItemDODocument, DoModelInterface>("ItemDeliveryOrder", ItemDeliverySchema);
export { ItemDeliveryOrderModel };
