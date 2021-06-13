"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../models/order.model");
const item_order_model_1 = require("../models/item.order.model");
const unit_model_1 = require("../models/unit.model");
class OrderController {
    static createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //  const nota = req.body.nota
            function next_id(input) {
                var output = parseInt(input, 10);
                output += "";
                while (output.length < 2)
                    output = "0" + output;
                return output;
            }
            function next_id2(input) {
                var output = parseInt(input, 10) + 1;
                output += "";
                while (output.length < 4)
                    output = "0" + output;
                return output;
            }
            let nota;
            let tanggal = new Date().getDate();
            let bulan = new Date().getMonth();
            let tahun = new Date().getFullYear();
            tahun += "";
            const orderData = yield order_model_1.OrderModel.find();
            if (!orderData[0]) {
                nota = 'NT' + tahun.slice(2) + next_id(bulan) + next_id(tanggal) + '0001';
            }
            else {
                const no_nota = orderData.pop().nota;
                nota = 'NT' + tahun.slice(2) + next_id(bulan) + next_id(tanggal) + next_id2(no_nota.slice(8));
                console.log(next_id2(no_nota.slice(8)));
            }
            // console.log(nota)
            try {
                const newOrder = yield order_model_1.OrderModel.create({
                    nota: nota
                });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Create Order`,
                    data: newOrder
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getOrder(req, res, next) {
        order_model_1.OrderModel.find()
            .then((resOrder) => {
            res.status(201).json({
                message: "Success Find All Order",
                data: resOrder,
            });
        })
            .catch((err) => {
            next(err);
        });
    }
    static getOneOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundOrder = yield order_model_1.OrderModel.findById(req.params.id_order);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Get One Order`,
                    data: foundOrder
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllItem(req, res, next) {
        item_order_model_1.ItemOrderModel.find()
            .then((resOrder) => {
            res.status(201).json({
                message: "Success Find All Item Order",
                data: resOrder,
            });
        })
            .catch((err) => {
            next(err);
        });
    }
    static getOneItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundItem = yield item_order_model_1.ItemOrderModel.findById(req.params.id_item);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Get One Item`,
                    data: foundItem
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static addItemOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { product, unit, quantity, priceTotal } = req.body;
            const foundUnit = yield unit_model_1.UnitModel.findById(unit);
            priceTotal = parseInt(quantity) * parseInt(foundUnit.sellPrice);
            try {
                const addedItem = yield item_order_model_1.ItemOrderModel.create({
                    product: product,
                    unit: unit,
                    quantity: quantity,
                    priceTotal: priceTotal,
                });
                const pushedItem = yield order_model_1.OrderModel.findByIdAndUpdate(req.params.id_order, {
                    $push: { 'items': addedItem },
                    $inc: { 'subTotal': priceTotal, 'totalPrice': priceTotal }
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    message: `Add Item Order`,
                    data: addedItem,
                    dataOrder: pushedItem
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static paid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { totalPrice, pricePaid } = req.body;
            const refund = pricePaid - totalPrice;
            console.log(refund);
            console.log(req.params.id_order);
            try {
                const paidOrder = yield order_model_1.OrderModel.findByIdAndUpdate(req.params.id_order, {
                    pricePaid: pricePaid,
                    statusOrder: 'paid',
                    refund: refund
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    message: `Paid Order`,
                    data: paidOrder
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static addTax(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundOrder = yield order_model_1.OrderModel.findById(req.params.id_order);
                const taxPrice = (10 / 100) * foundOrder.totalPrice;
                const totalPrice = foundOrder.totalPrice - taxPrice;
                // console.log('harga asli' + foundOrder.totalPrice)
                // console.log('harga setelah tax' + totalPrice)
                // console.log('harga tax' + taxPrice)
                const addedTax = yield order_model_1.OrderModel.findByIdAndUpdate(req.params.id_order, {
                    tax: true,
                    totalPrice: totalPrice,
                    taxPrice: taxPrice
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    message: `Added Tax`,
                    data: addedTax
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteTax(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundOrder = yield order_model_1.OrderModel.findById(req.params.id_order);
                const deletedTax = foundOrder.totalPrice + foundOrder.taxPrice;
                const deleteTaxt = yield order_model_1.OrderModel.findByIdAndUpdate(req.params.id_order, {
                    tax: false,
                    totalPrice: deletedTax,
                    taxPrice: 0
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    message: `Delete Tax`,
                    data: deleteTaxt
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static cancelOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cancelOrder = yield order_model_1.OrderModel.findByIdAndUpdate(req.params.id_order, {
                    statusOrder: 'cancel',
                    cancelMessage: req.body.cancelMessage
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    message: `Cancel Order`,
                    data: cancelOrder
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundItem = yield item_order_model_1.ItemOrderModel.findById(req.params.id_item);
            const foundOrder = yield order_model_1.OrderModel.findById(req.params.id_order);
            try {
                const updatedOrder = yield order_model_1.OrderModel.findByIdAndUpdate(foundOrder === null || foundOrder === void 0 ? void 0 : foundOrder._id, {
                    $pull: { 'items': { _id: foundItem._id } },
                    $inc: { 'subTotal': -foundItem.priceTotal, 'totalPrice': -foundItem.priceTotal }
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    message: `Delete Item Order`,
                    data: updatedOrder,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static editOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderID = req.params.id;
                const editDataOrder = {
                    nota: req.body.nota,
                    tax: req.body.tax,
                    totalPrice: req.body.totalPrice,
                };
                for (const key in editDataOrder) {
                    if (!editDataOrder[key]) {
                        delete editDataOrder[key];
                    }
                }
                const updateDataOrder = yield order_model_1.OrderModel.findByIdAndUpdate(orderID, editDataOrder, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success edit Order`,
                    data: updateDataOrder,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderID = req.params.id;
            const foundOrder = yield order_model_1.OrderModel.findById(orderID);
            try {
                if (!orderID) {
                    throw { name: "Params Is Empty" };
                }
                if (!foundOrder) {
                    throw { name: "Data Not Found" };
                }
                const updateStatus = yield order_model_1.OrderModel.findByIdAndUpdate(orderID, { status: false }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Delete Inventory Order",
                    data: updateStatus,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getDetailOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detailOrder = yield order_model_1.OrderModel.findById(req.params.id);
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Get Detail Order",
                    data: detailOrder,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = OrderController;
