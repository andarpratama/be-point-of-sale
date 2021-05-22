import mongoose, { Schema } from "mongoose";
import { IOrder } from "../interfaces/IOrder";
import { OrderDocument } from "../interfaces/IOrder.mongoose";

interface OrderModelInterface extends mongoose.Model<OrderDocument> {
    build(attr: IOrder): OrderDocument;
}

const orderSchema = new Schema(
    {
        code: {
            type: String,
        },
        productID: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        },
        tax: {
            type: Number,
        },
        statusOrder: {
            type: Boolean,
        },
        totalPrice: {
            type: Number,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const InvoiceModel = mongoose.model<OrderDocument, OrderModelInterface>(
    "Invoice",
    orderSchema
);
export { InvoiceModel };
