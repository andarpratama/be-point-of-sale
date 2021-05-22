import { Document } from "mongoose";

interface IProduct extends Document {
    code: string;
    name: string;
    image: string;
    unitID: string;
    status: boolean;
}

export { IProduct };
