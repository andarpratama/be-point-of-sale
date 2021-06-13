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
const user_model_1 = require("../models/user.model");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logging_1 = __importDefault(require("../config/logging"));
const validator_1 = __importDefault(require("validator"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class Auth {
    constructor() {
        dotenv_1.default.config();
    }
    static home(req, res, err) {
        res.status(200).json({ message: 'Auth / Home' });
    }
    static forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const foundUser = yield user_model_1.UserModel.findOne({ email });
                if (!foundUser) {
                    throw { name: 'Email not Registered' };
                }
                const idUser = foundUser === null || foundUser === void 0 ? void 0 : foundUser._id;
                const tokenForgotPassword = jsonwebtoken_1.default.sign({ id: idUser }, "Assignment4", {
                    expiresIn: "10m",
                });
                const apiResetPassword = 'http://localhost:4200/auth/reset-password';
                let transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'andar.salt@gmail.com',
                        pass: 'prathama354'
                    }
                });
                const buttonName = 'Reset Password';
                const buttonHref = `${apiResetPassword}/${tokenForgotPassword}/${idUser}`;
                const buttonReset = `<a href="${buttonHref}" style="padding: 13px 18px; border: none;border-radius: 5px; background-color: dodgerblue; color: white; font-size: 16px;text-decoration: none;font-family: sans-serif;" >${buttonName}</a>`;
                const emailMessage = `
            <h1>Hai ${foundUser === null || foundUser === void 0 ? void 0 : foundUser.name}</h1>
            You are recieving this email because we recivied as password reset request for your account.
            <br>
            <div style="width: 100%; text-align: center; margin-top: 20px;" >
            ${buttonReset}
            </div>
            <br>

            This link will be active for 10 minutes, after that link password reset will be expired
            If you did not request a password request, no further action is required.
            <br> <br>

            Thankyou, <br>
            <b>Acong Store</b>
            <br> <br>

            <hr>
            If you are having trouble clicking the "Reset Password" button, copy and pase URL below into your web browser
            <br>
            ${buttonHref}
         `;
                let mailOptions = {
                    from: 'andar.salt@gmail.com',
                    to: foundUser.email,
                    subject: 'Reset Password from ACONG STORE',
                    text: 'Link Reset Password',
                    html: emailMessage
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        res.json({
                            error: err
                        });
                    }
                    else {
                        res.status(200).json({
                            success: true,
                            statusCode: 200,
                            responseStatus: "Status OK",
                            message: "Forgot password",
                            data: foundUser === null || foundUser === void 0 ? void 0 : foundUser._id,
                            token: tokenForgotPassword,
                            info: info.response
                        });
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenResetPassword = req.body.token;
            const userId = req.body.user;
            const password = req.body.password;
            try {
                if (!tokenResetPassword) {
                    throw { name: 'Missing Token Reset Password' };
                }
                const foundUser = yield user_model_1.UserModel.findOne({ _id: userId });
                if (!foundUser) {
                    throw { name: 'ID not Registered' };
                }
                jsonwebtoken_1.default.verify(tokenResetPassword, "Assignment4", function (error, decodedData) {
                    if (error) {
                        throw { name: 'Access Token Expired' };
                    }
                });
                const updatedPassword = yield user_model_1.UserModel.findByIdAndUpdate(userId, {
                    password: yield bcryptjs_1.default.hash(password, 8)
                });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Berhasil reset password",
                    oldPassword: foundUser === null || foundUser === void 0 ? void 0 : foundUser.password,
                    newPassword: updatedPassword === null || updatedPassword === void 0 ? void 0 : updatedPassword.password
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static signup(req, res, next) {
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
                    password: yield bcryptjs_1.default.hash(req.body.password, 8)
                });
                yield newUser.save();
                res.status(201).json({
                    success: true,
                    message: 'Success Registration',
                    status: 'Created',
                    statusCode: 201,
                    data: newUser
                });
                logging_1.default.info('SIGNUP', 'MESSAGE: Success Sigup');
            }
            catch (err) {
                next(err);
            }
        });
    }
    static signin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.email) {
                    throw { name: 'Email is Required' };
                }
                if (!validator_1.default.isEmail(req.body.email)) {
                    throw { name: 'Invalid Email' };
                }
                if (!req.body.password) {
                    throw { name: 'Password is Required' };
                }
                const loginUser = {
                    username: req.body.username,
                    email: req.body.email
                };
                for (const key in loginUser) {
                    if (!loginUser[key]) {
                        delete loginUser[key];
                    }
                }
                const foundUser = yield user_model_1.UserModel.findOne(loginUser);
                // When user not found
                if (!foundUser) {
                    throw { name: 'Email not Registered' };
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(req.body.password, foundUser.password);
                // When User password is wrong
                if (!isPasswordValid) {
                    throw { name: 'Invalid Password' };
                }
                const secretKey = process.env.SECRET_KEY;
                let token = jsonwebtoken_1.default.sign({ id: foundUser.id }, secretKey);
                const roleKey = process.env.ROLE_KEY;
                let tokenRole = jsonwebtoken_1.default.sign({ roleAcess: foundUser.role }, roleKey);
                res.status(200).json({
                    success: true,
                    message: 'Login Success',
                    data: {
                        User: foundUser._id,
                        Authorization: `Bearer ${token}`,
                        RoleAccess: `Bearer ${tokenRole}`,
                        expiresIn: 3600,
                    },
                    status: 'OK',
                    statusCode: 200
                });
                logging_1.default.info('SIGNIN', 'MESSAGE: Success Signin');
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = Auth;
