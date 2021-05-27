import mongoose, { Schema } from "mongoose";
import { ISupplier } from "../interfaces/ISupplier";
import { SupplierDocument } from "../interfaces/ISupplier.mongoose";

interface SupplierModelInterface extends mongoose.Model<SupplierDocument> {
    build(attr: ISupplier): SupplierDocument;
}

const supplierSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        handphone: {
            type: String,
            required: true,
        },
        status: {
           type: Boolean,
           default: true
        }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const SupplierModel = mongoose.model<SupplierDocument, SupplierModelInterface>(
    "Supplier",
    supplierSchema
);
export { SupplierModel };
