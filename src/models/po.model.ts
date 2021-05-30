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
        },
        items: [{
            type: mongoose.Types.ObjectId,
            ref: "ItemPurchaseOrderModel",
        }],
        totalProduct: {
            type: Number,
            default: 0
        },
        totalQuantity: {
           type: Number,
           default: 0
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
           enum: ['pending', 'paid'],
           default: 'pending'
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
