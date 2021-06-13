"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
class AuthRoute {
    constructor() {
        this.router = express_1.Router();
        this.home();
        this.register();
        this.login();
        this.forgotPassword();
        this.resetPassword();
    }
    home() {
        this.router.get('/', auth_controller_1.default.home);
    }
    register() {
        this.router.post('/signup', auth_controller_1.default.signup);
    }
    login() {
        this.router.post('/signin', auth_controller_1.default.signin);
    }
    forgotPassword() {
        this.router.post('/forgot-password', auth_controller_1.default.forgotPassword);
    }
    resetPassword() {
        this.router.post('/reset-password', auth_controller_1.default.resetPassword);
    }
}
exports.default = new AuthRoute().router;
