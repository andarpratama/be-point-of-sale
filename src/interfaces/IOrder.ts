import { Document } from "mongoose";

interface IOrder extends Document {
    code: string;
    productID: string;
    tax: number;
    statusOrder: boolean;
    totalPrice: number;
}

export { IOrder };
