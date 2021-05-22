import { Document } from "mongoose";

interface IBrand extends Document {
    name: string;
    status: boolean;
}

export { IBrand };
