import mongoose from "mongoose";

interface RoleDocument extends mongoose.Document {
    name: string;
}

export { RoleDocument };
