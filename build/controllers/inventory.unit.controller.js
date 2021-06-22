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
const product_model_1 = require("../models/product.model");
const unit_model_1 = require("../models/unit.model");
class InventoryUnitController {
    static postInventoryUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, alias, sellPrice, buyPrice, productID } = req.body;
            const allbody = { name, alias, sellPrice, buyPrice, productID };
            try {
                if (!name) {
                    throw { name: "Input body Required" };
                }
                if (!alias) {
                    throw { name: "Input body Required" };
                }
                if (!sellPrice) {
                    throw { name: "Input body Required" };
                }
                if (!productID) {
                    throw { name: "Input body Required" };
                }
                const foundProduct = yield product_model_1.ProductModel.findById(productID);
                const itemUnitID = foundProduct.unitID;
                for (let idUnit of itemUnitID) {
                    const foundUnit = yield unit_model_1.UnitModel.findById(idUnit);
                    const foundNameUnit = foundUnit.name.toUpperCase();
                    const nameCase = name.toUpperCase();
                    const foundAliasUnit = foundUnit.alias.toUpperCase();
                    const aliasCase = alias.toUpperCase();
                    if (foundNameUnit == nameCase) {
                        throw { name: "Data Has Been Addedd" };
                    }
                    if (foundAliasUnit == aliasCase) {
                        throw { name: "Data Has Been Addedd" };
                    }
                }
                const newUnit = yield unit_model_1.UnitModel.create({
                    name: name,
                    alias: alias,
                    sellPrice: sellPrice,
                    buyPrice: buyPrice,
                    productID: foundProduct
                });
                yield product_model_1.ProductModel.findByIdAndUpdate(productID, {
                    $push: { 'unitID': newUnit._id }
                }, { new: true });
                res.status(201).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    message: `Unit ${name} Created`,
                    data: newUnit,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getInventoryUnit(req, res, next) {
        unit_model_1.UnitModel.find().sort({ created_at: 'desc' })
            .then((resUnit) => {
            res.status(201).json({
                message: "Success Find All Unit",
                data: resUnit,
            });
        })
            .catch((err) => {
            next(err);
        });
    }
    static getOneUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUnit = yield unit_model_1.UnitModel.findById(req.params.id);
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Get unit with this id",
                    data: foundUnit,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static editInventoryUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, alias, sellPrice, buyPrice, stock, productID } = req.body;
            const allbody = { name, alias, sellPrice, buyPrice, productID };
            const unitID = req.params.id;
            try {
                if (!allbody) {
                    throw { name: "Input body Required" };
                }
                const foundProduct = yield product_model_1.ProductModel.findById(productID);
                const editDataUnit = {
                    name: name,
                    alias: alias,
                    sellPrice: sellPrice,
                    buyPrice: buyPrice,
                    productID: foundProduct
                };
                for (const key in editDataUnit) {
                    if (!editDataUnit[key]) {
                        delete editDataUnit[key];
                    }
                }
                const updateDataUnit = yield unit_model_1.UnitModel.findByIdAndUpdate(unitID, editDataUnit, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success edit Unit`,
                    data: updateDataUnit,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteInventoryUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const unitID = req.params.id;
            const foundUnit = yield unit_model_1.UnitModel.findById(unitID);
            try {
                if (!unitID) {
                    throw { name: "Params Is Empty" };
                }
                if (!foundUnit) {
                    throw { name: "Data Not Found" };
                }
                const updateStatus = yield unit_model_1.UnitModel.findByIdAndUpdate(unitID, { status: false }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Delete Inventory Unit",
                    data: updateStatus,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = InventoryUnitController;
