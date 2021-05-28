import mongoose from "mongoose";

interface IItemPODocument extends mongoose.Document {
   products: string,
   unit: string,
   quantity: number,
   buyPrice: number
}

export { IItemPODocument };
