"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_product_controller_1 = __importDefault(require("../controllers/inventory.product.controller"));
class InventoryProductRoutes {
    constructor() {
        this.router = express_1.Router();
        this.getInventoryProduct();
        this.postInventoryProduct();
        this.editInventoryProduct();
        this.deleteInventoryProduct();
        this.getDetailInventoryProduct();
        this.activeProduct();
        this.unactiveProduct();
        this.uploadImage();
        this.getDetailProductByCode();
    }
    getInventoryProduct() {
        this.router.get("/product", inventory_product_controller_1.default.getInventoryProduct);
    }
    postInventoryProduct() {
        this.router.post("/product", inventory_product_controller_1.default.postInventoryProduct);
    }
    activeProduct() {
        this.router.get("/product/active/:id_product", inventory_product_controller_1.default.activeProduct);
    }
    unactiveProduct() {
        this.router.get("/product/unactive/:id_product", inventory_product_controller_1.default.unactiveProduct);
    }
    uploadImage() {
        this.router.post("/product/upload/:id_product", inventory_product_controller_1.default.uploadImage);
    }
    getDetailProductByCode() {
        this.router.get("/product/detailbycode/:code", inventory_product_controller_1.default.getDetailByCode);
    }
    editInventoryProduct() {
        this.router.patch("/product/:id", inventory_product_controller_1.default.editInventoryProduct);
    }
    deleteInventoryProduct() {
        this.router.delete("/product/:id", inventory_product_controller_1.default.deleteInventoryProduct);
    }
    getDetailInventoryProduct() {
        this.router.get("/product/:id/detail", inventory_product_controller_1.default.getDetailInventoryProduct);
    }
}
exports.default = new InventoryProductRoutes().router;
