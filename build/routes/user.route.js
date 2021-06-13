"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_jwt_1 = require("../middlewares/auth.jwt");
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.getAllUser();
        this.create();
        //   this.authJwt();
        this.editUser();
        this.deleteUser();
        this.getDetailUser();
        this.errorHandler();
    }
    authJwt() {
        this.router.use(auth_jwt_1.authJwt.authentication);
    }
    create() {
        this.router.post('/', user_controller_1.default.create);
    }
    getAllUser() {
        this.router.get("/", user_controller_1.default.getAllUser);
    }
    editUser() {
        this.router.patch("/:id", user_controller_1.default.editUser);
    }
    deleteUser() {
        this.router.delete("/:id", user_controller_1.default.deleteUser);
    }
    getDetailUser() {
        this.router.get("/:id/detail", user_controller_1.default.getDetailUser);
    }
    errorHandler() {
        this.router.use(errorHandler_1.default.handleErrors);
    }
}
exports.default = new UserRoutes().router;
