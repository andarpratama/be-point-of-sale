"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchase_order_controller_1 = __importDefault(require("../controllers/purchase.order.controller"));
const purchase_order_controller_2 = __importDefault(require("../controllers/purchase.order.controller"));
class PurchaseOrderRoute {
    constructor() {
        this.router = express_1.Router();
        this.home();
        this.create();
        this.getOne();
        this.addItem();
        this.deleteItem();
        this.getItem();
        this.getOneItem();
        this.addDiscount();
        this.deleteDiscount();
        this.endPurchaseOrder();
    }
    home() {
        this.router.get('/', purchase_order_controller_2.default.home);
    }
    getOne() {
        this.router.get('/:id', purchase_order_controller_2.default.getOne);
    }
    create() {
        this.router.post('/', purchase_order_controller_1.default.createPurchaseOrder);
    }
    addItem() {
        this.router.post('/add-item/:id', purchase_order_controller_1.default.addItem);
    }
    getItem() {
        this.router.get('/item/getall', purchase_order_controller_1.default.getItem);
    }
    getOneItem() {
        this.router.get('/item/:id_item', purchase_order_controller_1.default.getOneItem);
    }
    addDiscount() {
        this.router.post('/add-discount/:id_po', purchase_order_controller_1.default.addDiscount);
    }
    deleteDiscount() {
        this.router.delete('/del-discount/:id_po', purchase_order_controller_1.default.deleteDiscount);
    }
    endPurchaseOrder() {
        this.router.get('/end-po/:id_po', purchase_order_controller_1.default.endPuchaseOrder);
    }
    deleteItem() {
        this.router.delete('/delete-item/:id_po/:id_item', purchase_order_controller_2.default.deleteItem);
    }
}
exports.default = new PurchaseOrderRoute().router;
