import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

interface IEstatement extends Document {
    name: string;
    credit: number;
    debit: number
}

interface EstatementDocument extends mongoose.Document {
    name: string;
    credit: number;
    debit: number
}


interface EstatementModelInterface extends mongoose.Model<EstatementDocument> {
    build(attr: IEstatement): EstatementDocument;
}

const estatementSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        credit: {
            type: Number,
            default: 0
        },
        debit: {
            type: Number,
            default: 0
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const EstatementModel = mongoose.model<EstatementDocument, EstatementModelInterface>(
    "Estatement",
    estatementSchema
);
export { EstatementModel, estatementSchema };
