import { Document } from "mongoose";

interface IOrder extends Document {
    code: string;
    productID: string;
    tax: boolean;
    statusOrder: string;
    totalPrice: number;
}

export { IOrder };
