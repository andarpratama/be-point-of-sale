"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_supplier_controller_1 = __importDefault(require("../controllers/inventory.supplier.controller"));
class InventorySupplierRoutes {
    constructor() {
        this.router = express_1.Router();
        this.getInventorySupplier();
        this.postInventorySupplier();
        this.editInventorySupplier();
        this.deleteInventorySupplier();
        this.getDetailInventorySupplier();
    }
    getInventorySupplier() {
        this.router.get("/supplier", inventory_supplier_controller_1.default.getInventorySupplier);
    }
    postInventorySupplier() {
        this.router.post("/supplier", inventory_supplier_controller_1.default.postInventorySupplier);
    }
    editInventorySupplier() {
        this.router.patch("/supplier/:id", inventory_supplier_controller_1.default.editInventorySupplier);
    }
    deleteInventorySupplier() {
        this.router.delete("/supplier/:id", inventory_supplier_controller_1.default.deleteInventorySupplier);
    }
    getDetailInventorySupplier() {
        this.router.get("/supplier/:id", inventory_supplier_controller_1.default.getDetailInventorySupplier);
    }
}
exports.default = new InventorySupplierRoutes().router;
