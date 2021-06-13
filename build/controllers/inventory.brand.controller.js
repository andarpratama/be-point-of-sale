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
const brand_model_1 = require("../models/brand.model");
class InventoryBrandController {
    static getOneInventoryBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const idBrand = req.params.id;
            try {
                const foundOneBrand = yield brand_model_1.BrandModel.findById(idBrand);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Success Find One Brand",
                    data: foundOneBrand,
                });
            }
            catch (error) {
            }
        });
    }
    //============================= CREATE REQUEST =============================
    static postInventoryBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.body.name;
            let code;
            function next_id(input) {
                var output = parseInt(input, 10) + 1; // parse and increment
                output += ""; // convert to string
                while (output.length < 2)
                    output = "00" + output; // prepend leading zeros
                return output;
            }
            let allBrand = yield brand_model_1.BrandModel.find();
            let result = allBrand.pop();
            if (!result) {
                code = '001';
            }
            else {
                //   code = next_id(result.code)
                code = next_id(result.code.slice(5));
            }
            try {
                if (!name) {
                    throw { name: "Input body Required" };
                }
                const newBrand = yield brand_model_1.BrandModel.create({
                    name: name,
                    code: 'BRAND' + code
                });
                res.status(201).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    message: `Brand ${name} Created`,
                    data: newBrand,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //============================= END OF CREATE REQUEST ======================
    //============================= READ REQUEST ===============================
    static getInventoryBrand(req, res, next) {
        brand_model_1.BrandModel.find()
            .then((resBrand) => {
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Success Find All Brand",
                data: resBrand,
            });
        })
            .catch((err) => {
            next(err);
        });
    }
    //============================= END OF READ REQUEST ========================
    static editInventoryBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const brandID = req.params.id;
            const { name } = req.body;
            const editDataBrand = { name };
            try {
                if (!name) {
                    throw { name: 'Input body Required' };
                }
                const updateName = yield brand_model_1.BrandModel.findByIdAndUpdate(brandID, editDataBrand, { new: true });
                res.status(201).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    message: `Success edit brand name to ${updateName === null || updateName === void 0 ? void 0 : updateName.name}`,
                    data: updateName,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteInventoryBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const brandID = req.params.id;
            const foundBrand = yield brand_model_1.BrandModel.findById(brandID);
            try {
                if (!brandID) {
                    throw { name: "Params Is Empty" };
                }
                if (!foundBrand) {
                    throw { name: "Data Not Found" };
                }
                const updateStatus = yield brand_model_1.BrandModel.findByIdAndUpdate(brandID, { status: false, name: foundBrand === null || foundBrand === void 0 ? void 0 : foundBrand.name }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Delete Inventory Brand",
                    data: updateStatus,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = InventoryBrandController;
