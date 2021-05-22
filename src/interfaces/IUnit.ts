import { Document } from "mongoose";

interface IUnit extends Document {
    name: string;
    alias: string;
    price: number;
    quantity: number;
}

export { IUnit };
