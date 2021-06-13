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
exports.ItemDeliverySchema = exports.ItemDeliveryOrderModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ItemDeliverySchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Product",
    },
    unit: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Unit",
    },
    quantity: {
        type: Number,
        required: true
    },
    id_po: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "PurchaseOrder",
    },
    id_item_po: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "ItemPurchaseOrder",
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
exports.ItemDeliverySchema = ItemDeliverySchema;
const ItemDeliveryOrderModel = mongoose_1.default.model("ItemDeliveryOrder", ItemDeliverySchema);
exports.ItemDeliveryOrderModel = ItemDeliveryOrderModel;
