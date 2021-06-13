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
class Company {
    static getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const idCompany = '60c68f5f7816a512d4042920';
            try {
                const foundOneCompany = yield company_model_1.CompanyModel.findById(idCompany);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Success Find One Company",
                    data: foundOneCompany,
                });
            }
            catch (error) {
            }
        });
    }
    static getAll(req, res, next) {
        company_model_1.CompanyModel.find()
            .then((resCompany) => {
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Success Find All Company",
                data: resCompany,
            });
        })
            .catch((err) => {
            next(err);
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, address, logo, handphone } = req.body;
            try {
                const createdCopmany = yield company_model_1.CompanyModel.create({ name, address, logo, handphone });
                res.status(201).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    data: createdCopmany
                });
            }
            catch (error) {
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companyID = req.params.id;
                const editDataCompany = {
                    name: req.body.name,
                    address: req.body.address,
                    logo: req.body.logo,
                    handphone: req.body.handphone,
                };
                for (const key in editDataCompany) {
                    if (!editDataCompany[key]) {
                        delete editDataCompany[key];
                    }
                }
                const updateDataCompany = yield company_model_1.CompanyModel.findByIdAndUpdate(companyID, editDataCompany, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success edit Company`,
                    data: updateDataCompany,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyID = req.params.id;
            const foundCompany = yield company_model_1.CompanyModel.findById(companyID);
            try {
                if (!companyID) {
                    throw { name: "Params Is Empty" };
                }
                if (!foundCompany) {
                    throw { name: "Data Not Found" };
                }
                const updateStatus = yield company_model_1.CompanyModel.findByIdAndUpdate(companyID, { status: false, name: foundCompany === null || foundCompany === void 0 ? void 0 : foundCompany.name }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Delete Company",
                    data: updateStatus,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = Company;
