"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryOrderModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const po_model_1 = require("../models/po.model");
const item_do_model_1 = require("../models/item.do.model");
const deliveryOrderSchema = new mongoose_1.Schema({
    no_do: {
        type: String,
        unique: true,
        required: true
    },
    purchaseOrder: po_model_1.puchaseOrderSchema,
    items: [item_do_model_1.ItemDeliverySchema],
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
        enum: ['unfinish', 'finish'],
        default: 'unfinish',
    },
    status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const deliveryOrderModel = mongoose_1.default.model("DelveryOrder", deliveryOrderSchema);
exports.deliveryOrderModel = deliveryOrderModel;
