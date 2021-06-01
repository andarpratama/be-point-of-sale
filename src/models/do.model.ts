import mongoose, { Schema } from "mongoose";

interface IDeliveryOrder extends Document {
   no_do: string,
   purchaseOrder: string,
   deliveryDate: Date,
   recivedDate: Date,
   addressCompany: string,
   prosesStatus: string,
   status: boolean
}

interface DeliveryOrderDocument extends mongoose.Document {
   no_do: string,
   purchaseOrder: string,
   deliveryDate: Date,
   recivedDate: Date,
   addressCompany: string,
   prosesStatus: string,
   status: boolean
}

interface DoInterfaceModel extends mongoose.Model<DeliveryOrderDocument> {
    build(attr: IDeliveryOrder): DeliveryOrderDocument;
}

const deliveryOrderSchema = new Schema(
    {
        no_do: {
            type: String,
            unique: true,
            required: true
        },
        purchaseOrder: {
            type: mongoose.Types.ObjectId,
            ref: "PurchaseOrder",
            required: true
        },
        deliveryDate: {
           type: Date,
        },
        recivedDate: {
           type: Date,
        },
        addressCompany: {
           type: String,
           required: true
        },
        prosesStatus: {
           type: String,
           enum: ['pending','delivery', 'recived'],
           default: 'pending',
        },
        status: {
           type: Boolean,
           default: true,
        }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const deliveryOrderModel = mongoose.model<DeliveryOrderDocument, DoInterfaceModel>("DelveryOrder", deliveryOrderSchema);
export { deliveryOrderModel };
