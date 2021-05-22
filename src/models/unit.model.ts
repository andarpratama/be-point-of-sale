import mongoose, { Schema } from "mongoose";
import { IUnit } from "../interfaces/IUnit";
import { UnitDocument } from "../interfaces/IUnit.mongoose";

interface UnitModelInterface extends mongoose.Model<UnitDocument> {
    build(attr: IUnit): UnitDocument;
}

const unitSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        alias: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const UnitModel = mongoose.model<UnitDocument, UnitModelInterface>(
    "Unit",
    unitSchema
);
export { UnitModel };
