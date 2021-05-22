import { Document } from "mongoose";

interface ISupplier extends Document {
    name: string;
    address: string;
    handphone: string;
}

export { ISupplier };
