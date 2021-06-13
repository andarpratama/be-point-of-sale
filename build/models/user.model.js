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
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Email is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'This email has been registered'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    handphone: {
        type: String
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['owner', 'inventory', 'finance', 'cashier']
    },
    status: {
        type: Boolean,
        default: true
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const UserModel = mongoose_1.default.model("User", userSchema);
exports.UserModel = UserModel;
