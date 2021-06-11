import mongoose from "mongoose";

interface IItemDODocument extends mongoose.Document {
   products: string,
   unit: string,
   quantity: number
}

export { IItemDODocument };
