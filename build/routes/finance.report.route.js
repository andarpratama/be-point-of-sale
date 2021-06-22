"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const finance_report_controller_1 = __importDefault(require("../controllers/finance.report.controller"));
class EstatementRoute {
    constructor() {
        this.router = express_1.Router();
        this.getAll();
        this.getOne();
        this.getAllByDate();
        // this.create()
        // this.update()
        // this.delete()
    }
    getAll() {
        this.router.get('/report', finance_report_controller_1.default.getAll);
    }
    getOne() {
        this.router.get('/report/:id', finance_report_controller_1.default.getOne);
    }
    getAllByDate() {
        this.router.post('/report/bydate', finance_report_controller_1.default.getReportByDate);
    }
}
exports.default = new EstatementRoute().router;
