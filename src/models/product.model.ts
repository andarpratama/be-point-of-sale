import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct";
import { ProductDocument } from "../interfaces/IProduct.mongoose";

interface ProductModelInterface extends mongoose.Model<ProductDocument> {
    build(attr: IProduct): ProductDocument;
}

const productSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        unitID: {
            type: mongoose.Types.ObjectId,
            ref: "Unit",
        },
        status: {
            type: Boolean,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ProductModel = mongoose.model<ProductDocument, ProductModelInterface>(
    "Product",
    productSchema
);
export { ProductModel };
