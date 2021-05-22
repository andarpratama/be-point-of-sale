import mongoose, { Schema } from "mongoose";
import { IInvoice } from "../interfaces/IInvoice";
import { InvoiceDocument } from "../interfaces/IInvoice.mongoose";

interface InvoiceModelInterface extends mongoose.Model<InvoiceDocument> {
    build(attr: IInvoice): InvoiceDocument;
}

const invoiceSchema = new Schema(
    {
        noInvoice: {
            type: String,
            required: true,
        },
        poID: {
            type: mongoose.Types.ObjectId,
            ref: "Po",
        },
        deliveryDate: {
            type: String,
        },
        deliveredDate: {
            type: String,
        },
        addressCompany: {
            type: mongoose.Types.ObjectId,
            ref: "Company",
        },
        processStatus: { type: Boolean },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const InvoiceModel = mongoose.model<InvoiceDocument, InvoiceModelInterface>(
    "Invoice",
    invoiceSchema
);
export { InvoiceModel };
