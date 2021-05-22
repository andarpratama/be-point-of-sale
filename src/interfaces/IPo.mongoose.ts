import mongoose from "mongoose";

interface PoDocument extends mongoose.Document {
    code: string;
    productID: string;
    quantity: number;
    unitID: string;
    supplierID: string;
    requestUser: string;
}

export { PoDocument };
