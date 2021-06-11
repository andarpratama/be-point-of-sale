import { Document } from "mongoose";

interface IItemDO extends Document {
   products: string,
   unit: string,
   quantity: number,
}

export { IItemDO };
