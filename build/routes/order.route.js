"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
class OrderRoutes {
    constructor() {
        this.router = express_1.Router();
        this.getOrder();
        this.getOneOrder();
        this.postOrder();
        this.addItemOrder();
        this.getAll();
        this.getOneItem();
        this.deleteItemOrder();
        this.paidOrder();
        this.addTax();
        this.deleteTax();
        this.cancelOrder();
    }
    getOrder() {
        this.router.get("/", order_controller_1.default.getOrder);
    }
    getOneOrder() {
        this.router.get("/getone/:id_order", order_controller_1.default.getOneOrder);
    }
    postOrder() {
        this.router.post("/", order_controller_1.default.createOrder);
    }
    paidOrder() {
        this.router.post("/paid/:id_order", order_controller_1.default.paid);
    }
    cancelOrder() {
        this.router.post("/cancel/:id_order", order_controller_1.default.cancelOrder);
    }
    /* ITEM --------------------------------------------- */
    addTax() {
        this.router.get("/tax/:id_order", order_controller_1.default.addTax);
    }
    deleteTax() {
        this.router.delete("/tax/:id_order", order_controller_1.default.deleteTax);
    }
    addItemOrder() {
        this.router.post("/:id_order/add-item", order_controller_1.default.addItemOrder);
    }
    getAll() {
        this.router.get("/item/getall", order_controller_1.default.getAllItem);
    }
    getOneItem() {
        this.router.get("/item/:id_item", order_controller_1.default.getOneItem);
    }
    deleteItemOrder() {
        this.router.delete("/delete-item/:id_order/:id_item", order_controller_1.default.deleteItem);
    }
}
exports.default = new OrderRoutes().router;
