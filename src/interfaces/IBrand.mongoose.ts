import mongoose from "mongoose";

interface BrandDocument extends mongoose.Document {
    name: string;
    status: boolean;
}

export { BrandDocument };
