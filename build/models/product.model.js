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
exports.productSchema = exports.ProductModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const brand_model_1 = require("./brand.model");
const productSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    unitID: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: "Unit",
        }],
    statusProduct: {
        type: String,
        required: true,
        enum: ['active', 'unactive'],
        default: 'active'
    },
    status: {
        type: Boolean,
        default: true,
    },
    purchaseAmount: {
        type: Number,
        default: 0,
    },
    brandID: brand_model_1.brandSchema
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
exports.productSchema = productSchema;
const ProductModel = mongoose_1.default.model("Product", productSchema);
exports.ProductModel = ProductModel;
