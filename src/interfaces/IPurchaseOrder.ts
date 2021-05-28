import { Document } from "mongoose";

interface IPurchaseOrder extends Document {
   no_po: string,
   items: string[],
   totalProduct: number,
   totalQuantity: number,
   supplierID: string,
   requestUser: string
}

export { IPurchaseOrder };
