import mongoose, { Schema} from 'mongoose'
import { IInvoice } from "../interfaces/IInvoice";
import { InvoiceDocument } from "../interfaces/IInvoice.mongoose";


interface InvoiceModelInterface extends mongoose.Model<InvoiceDocument>{
   build(attr: IInvoice):InvoiceDocument
}

const invoiceSchema = new Schema({
      noInvoice:{
         type: String
      },
      purchasOrderID: {
         type: mongoose.Types.ObjectId,
         ref: "Po",
      },
      price: {
         type: Number,
         required: true
      },
      company: {
         type: mongoose.Types.ObjectId,
         ref: "Company",
      },
      prosesStatus: {
         type: String,
         enum: ['unfinish', 'paid'],
         default: 'unfinish'
      },
      requestUser: {
         type: mongoose.Types.ObjectId,
         ref: "User",
      },
   }, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)

const InvoiceModel = mongoose.model<InvoiceDocument, InvoiceModelInterface>(
    "Invoice",
    invoiceSchema
);
export { InvoiceModel };