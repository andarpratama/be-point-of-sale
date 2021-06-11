import mongoose, { Schema } from "mongoose";
import { IOrder } from "../interfaces/IOrder";
import { OrderDocument } from "../interfaces/IOrder.mongoose";
import { ItemOrderSchema } from "../models/item.order.model";

interface OrderModelInterface extends mongoose.Model<OrderDocument> {
    build(attr: IOrder): OrderDocument;
}

const orderSchema = new Schema(
    {
        nota: {
            type: String,
            required: true
        },
        items: [ItemOrderSchema],
        statusOrder: {
           type: String,
           enum: ['pending', 'paid', 'cancel'],
           default: 'pending'
         },
         status: {
            type: Boolean,
            default: true
         },
         subTotal: {
            type: Number,
            default: 0
         },
         tax: {
             type: Boolean,
             default: false
         },
         taxPrice: {
            type: Number,
            default: 0
         },
         totalPrice: {
            type: Number,
            default: 0
         },
         pricePaid: {
            type: Number,
            default: 0
         },
         refund: {
            type: Number,
            default: 0
         },
         cancelMessage: {
            type: String,
         }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const OrderModel = mongoose.model<OrderDocument, OrderModelInterface>(
    "Order",
    orderSchema
);
export { OrderModel };
