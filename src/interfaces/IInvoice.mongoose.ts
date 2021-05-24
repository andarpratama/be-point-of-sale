import mongoose from "mongoose";

interface InvoiceDocument extends mongoose.Document {
   noInvoice: string
   poID: string
   deliveryDate: string
   deliveredDate: string
   addreessCompany: string
   prosesStatus: boolean
}

export { InvoiceDocument };
