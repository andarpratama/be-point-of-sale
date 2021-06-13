"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
class HomeController {
    static homePage(req, res) {
        logging_1.default.info("HOME", `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Welcome, this is API Pak Acong Store..",
        });
    }
}
exports.default = HomeController;
