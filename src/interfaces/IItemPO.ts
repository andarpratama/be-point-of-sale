import { Document } from "mongoose";

interface IItemPO extends Document {
   products: string,
   unit: string,
   quantity: number,
   buyPrice: number
}

export { IItemPO };
