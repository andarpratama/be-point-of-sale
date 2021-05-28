import mongoose from "mongoose";

interface PurchaseOrderDocument extends mongoose.Document {
    code: string;
    name: string;
    image: string;
    unitID: string;
    status: boolean;
}

export { PurchaseOrderDocument };
