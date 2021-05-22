import mongoose, { Schema } from "mongoose";
import { IBrand } from "../interfaces/IBrand";
import { BrandDocument } from "../interfaces/IBrand.mongoose";

interface BrandModelInterface extends mongoose.Model<BrandDocument> {
    build(attr: IBrand): BrandDocument;
}

const brandSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const BrandModel = mongoose.model<BrandDocument, BrandModelInterface>(
    "Brand",
    brandSchema
);
export { BrandModel };
