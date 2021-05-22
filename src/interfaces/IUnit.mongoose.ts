import mongoose from "mongoose";

interface UnitDocument extends mongoose.Document {
    name: string;
    alias: string;
    price: number;
    quantity: number;
}

export { UnitDocument };
