import { Document } from "mongoose";
import { IProduct } from "./IProduct";

interface IUnit extends Document {
    name: string;
    alias: string;
    price: number;
    sellPrice: number;
    buyPrice: number
    productID: IProduct
    quantity: number;
}

export { IUnit };
