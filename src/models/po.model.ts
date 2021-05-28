import mongoose, { Schema } from "mongoose";
import { IPurchaseOrder } from "../interfaces/IPurchaseOrder";
import { PurchaseOrderDocument } from "../interfaces/IPurchaseOrder.mongoose";

interface PoModelInterface extends mongoose.Model<PurchaseOrderDocument> {
    build(attr: IPurchaseOrder): PurchaseOrderDocument;
}

const puchaseOrderSchema = new Schema(
    {
        no_po: {
            type: String,
            required: true,
        },
        items: [{
            type: mongoose.Types.ObjectId,
            ref: "ItemPurchaseOrderModel",
            unique: [true, 'This item has been added']
        }],
        totalProduct: {
            type: Number,
        },
        totalQuantity: {
           type: Number,
        },
        supplierID: {
            type: mongoose.Types.ObjectId,
            ref: "Supplier",
        },
        requestUser: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        prosesStatus: {
           type: String,
           enum: ['pending', 'paid']
        },
        status: {
           type: Boolean,
           default: true
        }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const PurchaseOrdeModel = mongoose.model<PurchaseOrderDocument, PoModelInterface>("PurchaseOrder", puchaseOrderSchema);
export { PurchaseOrdeModel };
