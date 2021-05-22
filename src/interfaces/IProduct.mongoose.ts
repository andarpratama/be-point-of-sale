import mongoose from "mongoose";

interface ProductDocument extends mongoose.Document {
    code: string;
    name: string;
    image: string;
    unitID: string;
    status: boolean;
}

export { ProductDocument };
