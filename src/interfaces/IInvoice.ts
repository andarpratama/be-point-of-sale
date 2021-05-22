import { Document } from "mongoose";

interface IInvoice extends Document {
    noInvoice: string;
    poID: string;
    deliveryDate: string;
    deliveredDate: string;
    addressCompany: string;
    processStatus: boolean;
}

export { IInvoice };
