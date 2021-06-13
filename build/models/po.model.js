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
exports.puchaseOrderSchema = exports.PurchaseOrdeModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const supplier_model_1 = require("../models/supplier.model");
const item_po_model_1 = require("../models/item.po.model");
const puchaseOrderSchema = new mongoose_1.Schema({
    no_po: {
        type: String,
    },
    items: [item_po_model_1.ItemPurchaseSchema],
    totalProduct: {
        type: Number,
        default: 0
    },
    totalQuantity: {
        type: Number,
        default: 0
    },
    subTotalPrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    discount: {
        type: Boolean,
        default: false
    },
    discountPrice: {
        type: Number,
        default: 0
    },
    supplierID: supplier_model_1.supplierSchema,
    requestUser: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
    prosesStatus: {
        type: String,
        enum: ['unfinish', 'pending', 'paid'],
        default: 'unfinish'
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
exports.puchaseOrderSchema = puchaseOrderSchema;
const PurchaseOrdeModel = mongoose_1.default.model("PurchaseOrder", puchaseOrderSchema);
exports.PurchaseOrdeModel = PurchaseOrdeModel;
