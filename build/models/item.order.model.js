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
exports.ItemOrderSchema = exports.ItemOrderModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ItemOrderSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Product",
        required: true
    },
    unit: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Unit",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    priceTotal: {
        type: Number,
        required: true
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
exports.ItemOrderSchema = ItemOrderSchema;
const ItemOrderModel = mongoose_1.default.model("ItemOrder", ItemOrderSchema);
exports.ItemOrderModel = ItemOrderModel;
