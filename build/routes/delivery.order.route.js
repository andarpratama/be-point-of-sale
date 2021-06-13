"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delivery_order_controller_1 = __importDefault(require("../controllers/delivery.order.controller"));
class DeliveryOrderRoute {
    constructor() {
        this.router = express_1.Router();
        this.getAll();
        this.create();
        this.getOne();
        this.update();
        this.delete();
        this.addItemDO();
        this.deleteItemDO();
        this.endDeliveryOrder();
    }
    getAll() {
        this.router.get('/', delivery_order_controller_1.default.home);
    }
    getOne() {
        this.router.get('/:id_do', delivery_order_controller_1.default.getOne);
    }
    create() {
        this.router.post('/', delivery_order_controller_1.default.create);
    }
    addItemDO() {
        this.router.post('/add-item/:id_do', delivery_order_controller_1.default.addItem);
    }
    deleteItemDO() {
        this.router.delete('/delete-item/:id_item_do/:id_do/:id_item_po/:id_po', delivery_order_controller_1.default.deleteItem);
    }
    endDeliveryOrder() {
        this.router.get('/end-do/:id_do', delivery_order_controller_1.default.endDeliveryOrder);
    }
    update() {
        this.router.patch('/:id_do', delivery_order_controller_1.default.update);
    }
    delete() {
        this.router.delete('/:id_do', delivery_order_controller_1.default.delete);
    }
}
exports.default = new DeliveryOrderRoute().router;
