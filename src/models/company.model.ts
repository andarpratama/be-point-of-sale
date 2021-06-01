import mongoose, { Schema } from "mongoose";
import { ICompany } from "../interfaces/ICompany";
import { CompanyDocument } from "../interfaces/ICompany.mongoose";

interface CompanyModelInterface extends mongoose.Model<CompanyDocument> {
    build(attr: ICompany): CompanyDocument;
}

const companySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        handphone: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const CompanyModel = mongoose.model<CompanyDocument, CompanyModelInterface>(
    "Company",
    companySchema
);
export { CompanyModel };
