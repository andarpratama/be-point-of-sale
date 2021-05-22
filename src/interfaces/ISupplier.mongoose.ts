import mongoose from "mongoose";

interface SupplierDocument extends mongoose.Document {
    name: string;
    address: string;
    handphone: string;
}

export { SupplierDocument };
