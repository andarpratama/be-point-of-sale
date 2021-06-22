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
const supplier_model_1 = require("../models/supplier.model");
class InventorySupplierController {
    static postInventorySupplier(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, address, handphone } = req.body;
            const allbody = { name, address, handphone };
            try {
                if (!allbody) {
                    throw { name: "Input body Required" };
                }
                const newSupplier = yield supplier_model_1.SupplierModel.create({
                    name: name,
                    address: address,
                    handphone: handphone,
                });
                res.status(201).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    message: `Supplier ${name} Created`,
                    data: newSupplier,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getInventorySupplier(req, res, next) {
        supplier_model_1.SupplierModel.find().sort({ created_at: 'desc' })
            .then((resSupplier) => {
            res.status(201).json({
                message: "Success Find All Supplier",
                data: resSupplier,
            });
        })
            .catch((err) => {
            next(err);
        });
    }
    static editInventorySupplier(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplierID = req.params.id;
                const editDataSupplier = {
                    name: req.body.name,
                    address: req.body.address,
                    handphone: req.body.handphone,
                };
                for (const key in editDataSupplier) {
                    if (!editDataSupplier[key]) {
                        delete editDataSupplier[key];
                    }
                }
                const updateDataSupplier = yield supplier_model_1.SupplierModel.findByIdAndUpdate(supplierID, editDataSupplier, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success edit Supplier`,
                    data: updateDataSupplier,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteInventorySupplier(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplierID = req.params.id;
            const foundSupplier = yield supplier_model_1.SupplierModel.findById(supplierID);
            try {
                if (!supplierID) {
                    throw { name: "Params Is Empty" };
                }
                if (!foundSupplier) {
                    throw { name: "Data Not Found" };
                }
                const updateStatus = yield supplier_model_1.SupplierModel.findByIdAndUpdate(supplierID, { status: false }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Delete Inventory Supplier",
                    data: updateStatus,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getDetailInventorySupplier(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detailSupplier = yield supplier_model_1.SupplierModel.findById(req.params.id);
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Get Detail Supplier",
                    data: detailSupplier,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = InventorySupplierController;
