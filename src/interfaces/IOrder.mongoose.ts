import mongoose from "mongoose";

interface OrderDocument extends mongoose.Document {
    code: string;
    productID: string;
    tax: boolean;
    statusOrder: string;
    totalPrice: number;
}

export { OrderDocument };
