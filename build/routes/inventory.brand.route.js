"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_brand_controller_1 = __importDefault(require("../controllers/inventory.brand.controller"));
class InventoryBrandRoutes {
    constructor() {
        this.router = express_1.Router();
        this.getInventoryBrand();
        this.postInventoryBrand();
        this.editInventoryBrand();
        this.deleteInventoryBrand();
        this.getOneInventoryBrand();
    }
    getOneInventoryBrand() {
        this.router.get('/brand/:id', inventory_brand_controller_1.default.getOneInventoryBrand);
    }
    getInventoryBrand() {
        this.router.get("/brand", inventory_brand_controller_1.default.getInventoryBrand);
    }
    postInventoryBrand() {
        this.router.post("/brand", inventory_brand_controller_1.default.postInventoryBrand);
    }
    editInventoryBrand() {
        this.router.patch("/brand/:id", inventory_brand_controller_1.default.editInventoryBrand);
    }
    deleteInventoryBrand() {
        this.router.delete("/brand/:id", inventory_brand_controller_1.default.deleteInventoryBrand);
    }
}
exports.default = new InventoryBrandRoutes().router;
