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
const company_model_1 = require("../models/company.model");
const estatement_model_1 = require("../models/estatement.model");
const invoice_model_1 = require("../models/invoice.model");
const po_model_1 = require("../models/po.model");
class InventoryInvoice {
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allInvoice = yield invoice_model_1.InvoiceModel.find();
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Success get all Invoice",
                    data: allInvoice
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
                const foundInvoice = yield invoice_model_1.InvoiceModel.findById(req.params.id);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Success get detail Invoice",
                    data: foundInvoice
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const purchasOrderID = req.body.purchasOrderID;
            const requestUser = req.body.requestUser;
            const company = yield company_model_1.CompanyModel.findById('60c68f5f7816a512d4042920');
            function next_id(input) {
                var output = parseInt(input, 10);
                output += "";
                while (output.length < 2)
                    output = "0" + output;
                return output;
            }
            function next_id2(input) {
                var output = parseInt(input, 10) + 1;
                output += "";
                while (output.length < 3)
                    output = "0" + output;
                return output;
            }
            let noInvoice;
            let tanggal = new Date().getDate();
            let bulan = new Date().getMonth();
            let tahun = new Date().getFullYear();
            tahun += "";
            const invoiceData = yield invoice_model_1.InvoiceModel.find();
            if (!invoiceData[0]) {
                noInvoice = 'INV' + tahun.slice(2) + next_id(tanggal) + next_id(bulan) + '001';
            }
            else {
                const no_invoiceData = invoiceData.pop().noInvoice;
                noInvoice = 'INV' + tahun.slice(2) + next_id(tanggal) + next_id(bulan) + next_id2(no_invoiceData.slice(9));
            }
            const foundPO = yield po_model_1.PurchaseOrdeModel.findById(purchasOrderID);
            const price = parseInt(foundPO.totalPrice);
            try {
                // Validasi jika product sudaha ada di Item Delivery Order
                const AllInvoice = yield invoice_model_1.InvoiceModel.find();
                AllInvoice.forEach((item) => {
                    if (purchasOrderID == item.purchasOrderID) {
                        throw { name: "Data Has Been Addedd" };
                    }
                });
                const newInvoice = yield invoice_model_1.InvoiceModel.create({
                    noInvoice: noInvoice,
                    purchasOrderID: purchasOrderID,
                    requestUser: requestUser,
                    company: company._id,
                    price: price
                });
                res.status(201).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Success Create Invoice",
                    data: newInvoice
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static paidInvoice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paidInvoice = yield invoice_model_1.InvoiceModel.findByIdAndUpdate(req.params.id_invoice, {
                    prosesStatus: 'paid'
                }, { new: true });
                const purchasOrderID = paidInvoice.purchasOrderID;
                const updatedStatusPO = yield po_model_1.PurchaseOrdeModel.findByIdAndUpdate(purchasOrderID, {
                    prosesStatus: 'paid'
                }, { new: true });
                const outcomeInvoice = yield estatement_model_1.EstatementModel.create({
                    name: 'Invoice' + ' ' + paidInvoice.noInvoice,
                    credit: paidInvoice.price,
                });
                res.status(201).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Success Paid Invoice",
                    data: paidInvoice,
                    outcomeInvoice: outcomeInvoice,
                    updatedStatusPO: updatedStatusPO
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
exports.default = InventoryInvoice;
