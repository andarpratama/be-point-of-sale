import { Document } from "mongoose";

interface IInvoice extends Document {
   noInvoice: string
   poID: string
   deliveryDate: string
   deliveredDate: string
   addreessCompany: string
   prosesStatus: boolean
}

export { IInvoice };
