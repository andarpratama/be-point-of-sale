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
const po_model_1 = require("../models/po.model");
const item_po_model_1 = require("../models/item.po.model");
const supplier_model_1 = require("../models/supplier.model");
class PurchaseOrderController {
    static home(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchase_orders = yield po_model_1.PurchaseOrdeModel.find();
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Get All Purchase Order`,
                    data: purchase_orders
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const found_purchase_orders = yield po_model_1.PurchaseOrdeModel.findById(req.params.id);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Get Spesific Purchase Order`,
                    data: found_purchase_orders
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static addItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validasi jika product sudaha ada di Item Delivery Order
                const thisPO = yield po_model_1.PurchaseOrdeModel.findById(req.params.id);
                // console.log(thisPO.items)
                thisPO.items.forEach((item) => {
                    if (req.body.unit == item.unit) {
                        throw { name: "Data Has Been Addedd" };
                    }
                });
                let price = parseInt(req.body.quantity) * parseInt(req.body.buyPrice);
                const addedItem = yield item_po_model_1.ItemPurchaseOrderModel.create({
                    product: req.body.product,
                    unit: req.body.unit,
                    quantity: parseInt(req.body.quantity),
                    buyPrice: parseInt(req.body.buyPrice),
                    totalPrice: price
                });
                const pushedItem = yield po_model_1.PurchaseOrdeModel.findByIdAndUpdate(req.params.id, {
                    $push: { 'items': addedItem },
                    $inc: { 'subTotalPrice': price, 'totalPrice': price }
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Add Item to Purchase Order`,
                    data: addedItem,
                    dataPO: pushedItem
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield item_po_model_1.ItemPurchaseOrderModel.findById(req.params.id_item);
                let price = parseInt(item.totalPrice);
                const deletedItem = yield po_model_1.PurchaseOrdeModel.findByIdAndUpdate(req.params.id_po, {
                    $pull: { 'items': { _id: req.params.id_item } },
                    $inc: { 'subTotalPrice': -price, 'totalPrice': -price }
                }, { new: true });
                yield item_po_model_1.ItemPurchaseOrderModel.findByIdAndDelete(req.params.id_item);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Delete Item from Purchase Order`,
                });
            }
            catch (error) {
                next(error);
                console.log(error);
            }
        });
    }
    static getItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundItem = yield item_po_model_1.ItemPurchaseOrderModel.find();
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Get Item from Purchase Order`,
                    data: foundItem
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getOneItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundItem = yield item_po_model_1.ItemPurchaseOrderModel.findById(req.params.id_item);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Get One Item from Purchase Order`,
                    data: foundItem
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createPurchaseOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                while (output.length < 3)
                    output = "0" + output;
                return output;
            }
            let no_po;
            let tanggal = new Date().getDate();
            let bulan = new Date().getMonth();
            let tahun = new Date().getFullYear();
            tahun += "";
            const purchaseOrder = yield po_model_1.PurchaseOrdeModel.find();
            if (!purchaseOrder[0]) {
                no_po = 'PO' + tahun.slice(2) + next_id(tanggal) + next_id(bulan) + '001';
            }
            else {
                const no_purchaseOrder = purchaseOrder.pop().no_po;
                no_po = 'PO' + tahun.slice(2) + next_id(tanggal) + next_id(bulan) + next_id2(no_purchaseOrder.slice(8));
            }
            console.log(req.body.supplierID);
            console.log(req.body.requestUser);
            const pushSupplier = yield supplier_model_1.SupplierModel.findById(req.body.supplierID);
            try {
                const newPO = yield po_model_1.PurchaseOrdeModel.create({
                    no_po: no_po,
                    supplierID: pushSupplier,
                    requestUser: req.body.requestUser
                });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Create Purchase Order`,
                    data: newPO,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static addDiscount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const discountPrice = req.body.discountPrice;
            try {
                const addedDiscount = yield po_model_1.PurchaseOrdeModel.findByIdAndUpdate(req.params.id_po, {
                    discount: true,
                    discountPrice: discountPrice,
                    $inc: { 'totalPrice': -parseInt(discountPrice) }
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Add Discount`,
                    data: addedDiscount
                });
            }
            catch (error) {
                next(error);
                console.log(error);
            }
        });
    }
    static deleteDiscount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundPO = yield po_model_1.PurchaseOrdeModel.findById(req.params.id_po);
                const addedDiscount = yield po_model_1.PurchaseOrdeModel.findByIdAndUpdate(req.params.id_po, {
                    discount: false,
                    discountPrice: foundPO.discountPrice,
                    $inc: { 'totalPrice': +parseInt(foundPO.discountPrice) }
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Delete Discount`,
                    data: addedDiscount
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static endPuchaseOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const endedPurchaseOrder = yield po_model_1.PurchaseOrdeModel.findByIdAndUpdate(req.params.id_po, {
                    prosesStatus: 'pending',
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Ended Purchase Order`,
                    data: endedPurchaseOrder
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = PurchaseOrderController;
