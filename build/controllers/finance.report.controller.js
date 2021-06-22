"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const estatement_model_1 = require("../models/estatement.model");
class FinanceReport {
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataEstatement = yield estatement_model_1.EstatementModel.find().sort({ created_at: 'desc' });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Success get all Estatement",
                    data: dataEstatement
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detailFinance = yield estatement_model_1.EstatementModel.findById(req.params.id);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Success get detail Estatement",
                    data: detailFinance
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getReportByDate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const starDate = req.body.star_date;
            const endDate = req.body.end_date;
            const dateRange = { $gte: starDate, $lte: endDate };
            try {
                const financeReport = yield estatement_model_1.EstatementModel.find({ updated_at: dateRange });
                // getInvoices = await Invoice.find({ status: "paid", updatedAt: dateRange })
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Success get Data Estatement by Date",
                    data: financeReport,
                    starDate: starDate,
                    endDate: endDate
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        res.status(200).json({
            message: 'OK'
        });
    }
}
exports.default = FinanceReport;
