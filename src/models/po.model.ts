import mongoose, { Schema } from "mongoose";
import { IPo } from "../interfaces/IPo";
import { PoDocument } from "../interfaces/IPo.mongoose";

interface PoModelInterface extends mongoose.Model<PoDocument> {
    build(attr: IPo): PoDocument;
}

const poSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        productID: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
        },
        unitID: {
            type: mongoose.Types.ObjectId,
            ref: "Unit",
        },
        supplierID: {
            type: mongoose.Types.ObjectId,
            ref: "Supplier",
        },
        requestUser: {
            type: mongoose.Types.ObjectId,
            ref: "LoggedInUser",
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const PoModel = mongoose.model<PoDocument, PoModelInterface>("Po", poSchema);
export { PoModel };
