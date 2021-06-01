import mongoose, { Schema } from "mongoose";
import { IPurchaseOrder } from "../interfaces/IPurchaseOrder";
import { PurchaseOrderDocument } from "../interfaces/IPurchaseOrder.mongoose";
import { supplierSchema } from "../models/supplier.model";

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
        subTotalPrice: {
           type: Number,
           default: 0
        },
        totalPrice: {
           type: Number,
           default: 0
        },
        discount: {
           type: Number,
           default: 0
        },
        supplierID: supplierSchema,
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
