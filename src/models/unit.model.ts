import mongoose, { Schema } from "mongoose";
import { IUnit } from "../interfaces/IUnit";
import { UnitDocument } from "../interfaces/IUnit.mongoose";
import { productSchema } from "./product.model";

interface UnitModelInterface extends mongoose.Model<UnitDocument> {
    build(attr: IUnit): UnitDocument;
}

const unitSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        alias: {
            type: String,
            required: true,
            unique: true
        },
        sellPrice: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            default: 0
        },
        status: {
            type: Boolean,
            default: true,
        },
        soldCount: {
            type: Number,
            default: 0
        },
        productID: productSchema
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const UnitModel = mongoose.model<UnitDocument, UnitModelInterface>(
    "Unit",
    unitSchema
);
export { UnitModel };
