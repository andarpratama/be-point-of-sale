import { Document } from "mongoose";

interface IPo extends Document {
    code: string;
    productID: string;
    quantity: number;
    unitID: string;
    supplierID: string;
    requestUser: string;
}

export { IPo };
