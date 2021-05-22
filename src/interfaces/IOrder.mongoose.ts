import mongoose from "mongoose";

interface OrderDocument extends mongoose.Document {
    code: string;
    productID: string;
    tax: number;
    statusOrder: boolean;
    totalPrice: number;
}

export { OrderDocument };
