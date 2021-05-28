import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";
import { UserDocument } from "../interfaces/IUser.mongoose";

interface UserModelInterface extends mongoose.Model<UserDocument> {
    build(attr: IUser): UserDocument;
}

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Email is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'This email has been registered'],
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        handphone: {
           type: String
        },
        image: {
            type: String,
        },
        role: {
           type: String,
           enum: ['owner', 'inventory', 'finance', 'cashier']
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const UserModel = mongoose.model<UserDocument, UserModelInterface>(
    "User",
    userSchema
);
export { UserModel };
