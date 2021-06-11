import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct";
import { ProductDocument } from "../interfaces/IProduct.mongoose";
import { brandSchema } from "./brand.model";

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
        unitID: [{
            type: mongoose.Types.ObjectId,
            ref: "Unit",
        }],
        statusProduct: {
           type: String,
           required: true,
           enum: ['active', 'unactive'],
           default: 'active'
        },
        status: {
            type: Boolean,
            default: true,
        },
        purchaseAmount: {
           type: Number,
           default: 0,
        },
        brandID: brandSchema
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ProductModel = mongoose.model<ProductDocument, ProductModelInterface>(
    "Product",
    productSchema
);
export { ProductModel, productSchema };
