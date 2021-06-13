import mongoose, { Schema } from "mongoose";
import { puchaseOrderSchema } from "../models/po.model";
import { IPurchaseOrder } from "../interfaces/IPurchaseOrder";
import { ItemDeliverySchema } from "../models/item.do.model";

interface IDeliveryOrder extends Document {
   no_do: string,
   purchaseOrder: IPurchaseOrder,
   deliveryDate: Date,
   recivedDate: Date,
   addressCompany: string,
   prosesStatus: string,
   status: boolean
}

interface DeliveryOrderDocument extends mongoose.Document {
   no_do: string,
   purchaseOrder: IPurchaseOrder,
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
        purchaseOrder: puchaseOrderSchema,
        items: [ItemDeliverySchema],
        deliveryDate: {
           type: Date,
        },
        recivedDate: {
           type: Date,
        },
        addressCompany: {
           type: String
        },
        prosesStatus: {
           type: String,
           enum: ['unfinish','finish'],
           default: 'unfinish',
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
