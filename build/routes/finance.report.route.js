"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_controller_1 = __importDefault(require("../controllers/company.controller"));
class EstatementRoute {
    constructor() {
        this.router = express_1.Router();
        this.home();
        this.create();
        this.getone();
        this.update();
        this.delete();
    }
    home() {
        this.router.get('/', company_controller_1.default.getAll);
    }
    create() {
        this.router.post('/', company_controller_1.default.create);
    }
    getone() {
        this.router.get('/detail', company_controller_1.default.getOne);
    }
    update() {
        this.router.patch('/:id', company_controller_1.default.update);
    }
    delete() {
        this.router.delete('/:id', company_controller_1.default.delete);
    }
}
exports.default = new EstatementRoute().router;
