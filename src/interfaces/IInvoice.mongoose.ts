import mongoose from "mongoose";

interface InvoiceDocument extends mongoose.Document {
    noInvoice: string;
    poID: string;
    deliveryDate: string;
    deliveredDate: string;
    addressCompany: string;
    processStatus: boolean;
}

export { InvoiceDocument };
