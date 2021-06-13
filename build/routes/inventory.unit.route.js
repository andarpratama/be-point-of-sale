"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_unit_controller_1 = __importDefault(require("../controllers/inventory.unit.controller"));
class InventoryUnitRoutes {
    constructor() {
        this.router = express_1.Router();
        this.getInventoryUnit();
        this.getOneUnit();
        this.postInventoryUnit();
        this.editInventoryUnit();
        this.deleteInventoryUnit();
    }
    getInventoryUnit() {
        this.router.get("/unit", inventory_unit_controller_1.default.getInventoryUnit);
    }
    getOneUnit() {
        this.router.get("/unit/:id", inventory_unit_controller_1.default.getOneUnit);
    }
    postInventoryUnit() {
        this.router.post("/unit", inventory_unit_controller_1.default.postInventoryUnit);
    }
    editInventoryUnit() {
        this.router.patch("/unit/:id", inventory_unit_controller_1.default.editInventoryUnit);
    }
    deleteInventoryUnit() {
        this.router.delete("/unit/:id", inventory_unit_controller_1.default.deleteInventoryUnit);
    }
}
exports.default = new InventoryUnitRoutes().router;
