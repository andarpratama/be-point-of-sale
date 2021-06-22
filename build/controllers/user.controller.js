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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserController {
    static getAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUser = yield user_model_1.UserModel.find().sort({ created_at: 'desc' });
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Get All User Data",
                data: allUser
            });
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.name) {
                    throw { name: 'Name Required' };
                }
                if (!req.body.email) {
                    throw { name: 'Email Required' };
                }
                if (!validator_1.default.isEmail(req.body.email)) {
                    throw { name: 'Invalid Email' };
                }
                if (!req.body.password) {
                    throw { name: 'Password Required' };
                }
                const newUser = new user_model_1.UserModel({
                    name: req.body.name,
                    email: req.body.email,
                    password: yield bcryptjs_1.default.hash(req.body.password, 8),
                    handphone: req.body.handphone,
                    role: req.body.role
                });
                yield newUser.save();
                res.status(201).json({
                    success: true,
                    message: 'Success Registration',
                    status: 'Created',
                    statusCode: 201,
                    data: newUser
                });
                // logging.info('SIGNUP', 'MESSAGE: Success Sigup')
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = req.params.id;
            const updateData = {
                name: req.body.name,
                email: req.body.email,
                handphone: req.body.handphone,
                role: req.body.role,
                status: true
            };
            for (const key in updateData) {
                if (!updateData[key]) {
                    delete updateData[key];
                }
            }
            const updatedUser = yield user_model_1.UserModel.findByIdAndUpdate(userID, updateData, { new: true });
            try {
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Success update user",
                    userID: userID,
                    updatedUser: updatedUser
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = req.params.id;
            try {
                const deletedUser = yield user_model_1.UserModel.findByIdAndUpdate(userID, { status: false }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Success delete user",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getDetailUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detailUser = yield user_model_1.UserModel.findById(req.params.id);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Get Detail User",
                    data: detailUser
                });
            }
            catch (error) {
                return res.json({ error: error });
            }
        });
    }
}
exports.default = UserController;
