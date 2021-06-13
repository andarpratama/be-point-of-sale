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
exports.OrderModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const item_order_model_1 = require("../models/item.order.model");
const orderSchema = new mongoose_1.Schema({
    nota: {
        type: String,
        required: true
    },
    items: [item_order_model_1.ItemOrderSchema],
    statusOrder: {
        type: String,
        enum: ['pending', 'paid', 'cancel'],
        default: 'pending'
    },
    status: {
        type: Boolean,
        default: true
    },
    subTotal: {
        type: Number,
        default: 0
    },
    tax: {
        type: Boolean,
        default: false
    },
    taxPrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    pricePaid: {
        type: Number,
        default: 0
    },
    refund: {
        type: Number,
        default: 0
    },
    cancelMessage: {
        type: String,
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const OrderModel = mongoose_1.default.model("Order", orderSchema);
exports.OrderModel = OrderModel;
