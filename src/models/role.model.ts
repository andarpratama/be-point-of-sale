import mongoose, { Schema } from "mongoose";
import { IRole } from "../interfaces/IRole";
import { RoleDocument } from "../interfaces/IRole.mongoose";

interface RoleModelInterface extends mongoose.Model<RoleDocument> {
    build(attr: IRole): RoleDocument;
}

const roleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const RoleModel = mongoose.model<RoleDocument, RoleModelInterface>(
    "Role",
    roleSchema
);
export { RoleModel };
