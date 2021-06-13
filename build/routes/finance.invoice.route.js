"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const finance_invoice_1 = __importDefault(require("../controllers/finance.invoice"));
class FinanceRoute {
    constructor() {
        this.router = express_1.Router();
        this.getAll();
        this.getOne();
        this.create();
        this.paidInvoice();
    }
    getAll() {
        this.router.get('/invoice', finance_invoice_1.default.getAll);
    }
    getOne() {
        this.router.get('/invoice/:id', finance_invoice_1.default.getOne);
    }
    create() {
        this.router.post('/invoice', finance_invoice_1.default.create);
    }
    paidInvoice() {
        this.router.get('/invoice/paid/:id_invoice', finance_invoice_1.default.paidInvoice);
    }
}
exports.default = new FinanceRoute().router;
