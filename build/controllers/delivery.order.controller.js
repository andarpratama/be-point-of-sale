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
const do_model_1 = require("../models/do.model");
const item_do_model_1 = require("../models/item.do.model");
const item_po_model_1 = require("../models/item.po.model");
const po_model_1 = require("../models/po.model");
const unit_model_1 = require("../models/unit.model");
class deliveryOrderController {
    static home(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doData = yield do_model_1.deliveryOrderModel.find();
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Get All Data Delivery Order`,
                    data: doData
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
                const oneDO = yield do_model_1.deliveryOrderModel.findById(req.params.id_do);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Get Spesific Data Delivery Order`,
                    data: oneDO
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static create(req, res, next) {
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
            let no_do;
            let tanggal = new Date().getDate();
            let bulan = new Date().getMonth();
            let tahun = new Date().getFullYear();
            tahun += "";
            const deliveryOrder = yield do_model_1.deliveryOrderModel.find();
            if (!deliveryOrder[0]) {
                no_do = 'DO' + tahun.slice(2) + next_id(tanggal) + next_id(bulan) + '001';
            }
            else {
                const no_deliveryOrder = deliveryOrder.pop().no_do;
                no_do = 'DO' + tahun.slice(2) + next_id(tanggal) + next_id(bulan) + next_id2(no_deliveryOrder.slice(8));
            }
            const purchaseOrderItem = yield po_model_1.PurchaseOrdeModel.findById(req.body.purchaseOrder);
            try {
                // Validasi jika tamnbah PO yang sama
                const dataDO = yield do_model_1.deliveryOrderModel.find();
                dataDO.forEach((item) => {
                    const purchaseID = item.purchaseOrder._id;
                    if (req.body.purchaseOrder == purchaseID) {
                        throw { name: "Data Has Been Addedd" };
                    }
                });
                const newDeliveryOrder = yield do_model_1.deliveryOrderModel.create({
                    no_do: no_do,
                    purchaseOrder: purchaseOrderItem,
                });
                res.status(201).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    message: `CREATE Delivery Order`,
                    data: dataDO
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_do = req.params.id_do;
            const updateData = {
                purchaseOrder: req.body.purchaseOrder,
                addressCompany: req.body.addressCompany
            };
            for (const key in updateData) {
                if (!updateData[key]) {
                    delete updateData[key];
                }
            }
            try {
                const updateDO = yield do_model_1.deliveryOrderModel.findByIdAndUpdate(id_do, updateData, { new: true });
                res.status(20).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Update Delivery Order`,
                    data: updateDO
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static addItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = req.body.product;
            const unit = req.body.unit;
            const quantity = parseInt(req.body.quantity);
            const id_item_po = req.body.id_item_po;
            const id_po = req.body.id_po;
            try {
                // Validasi jika product sudaha ada di Item Delivery Order
                const thisPO = yield do_model_1.deliveryOrderModel.findById(req.params.id_do);
                thisPO.items.forEach((item) => {
                    if (unit == item.unit) {
                        throw { name: "Data Has Been Addedd" };
                    }
                });
                if (!product) {
                    throw { name: "Input body Required" };
                }
                if (!unit) {
                    throw { name: "Input body Required" };
                }
                if (!quantity) {
                    throw { name: "Input body Required" };
                }
                // Validasi jika quantity DO itu lebih besar dengan quantity PO
                const foundItemPO = yield item_po_model_1.ItemPurchaseOrderModel.findById(id_item_po);
                const quantityPO = parseInt(foundItemPO.quantity);
                const quantityTakenPO = parseInt(foundItemPO.quantityTaken);
                const quantityFix = quantityPO - quantityTakenPO;
                if (quantity > quantityFix) {
                    throw { name: "Valid Quantity Delivery Order" };
                }
                // Simpan Data ke Schema Item Delivery Order
                const addedItemDO = yield item_do_model_1.ItemDeliveryOrderModel.create({
                    product: product,
                    unit: unit,
                    quantity: quantity,
                    id_po: id_po,
                    id_item_po: id_item_po,
                });
                // Update quantityTaken di Item Purchase Order
                const updatedItemPO = yield item_po_model_1.ItemPurchaseOrderModel.findByIdAndUpdate(foundItemPO._id, {
                    $inc: { 'quantityTaken': quantity, }
                }, { new: true });
                // Pull Item Array di PO dan push Item Array Baru
                const pulledItemArrayPO = yield po_model_1.PurchaseOrdeModel.findByIdAndUpdate(id_po, {
                    $pull: { 'items': { _id: id_item_po } },
                }, { new: true });
                const pushedItemArrayPO = yield po_model_1.PurchaseOrdeModel.findByIdAndUpdate(id_po, {
                    $push: { 'items': updatedItemPO },
                }, { new: true });
                // Push Item ke Schema Delivery Order
                const pushedItemDO = yield do_model_1.deliveryOrderModel.findByIdAndUpdate(req.params.id_do, {
                    purchaseOrder: pushedItemArrayPO,
                    $push: { 'items': addedItemDO },
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Add Item Delivery Order`,
                    data: addedItemDO,
                    dataPO: updatedItemPO,
                    dataDO: pushedItemDO
                });
            }
            catch (error) {
                next(error);
                console.log(error);
            }
        });
    }
    static deleteItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Cek semua params work
                const foundItemDO = yield item_do_model_1.ItemDeliveryOrderModel.findById(req.params.id_item_do);
                const foundDO = yield do_model_1.deliveryOrderModel.findById(req.params.id_do);
                const foundItemPO = yield item_po_model_1.ItemPurchaseOrderModel.findById(req.params.id_item_po);
                const foundPO = yield po_model_1.PurchaseOrdeModel.findById(req.params.id_po);
                // Hapus item DO dari array items DO
                const pulledItemDO = yield do_model_1.deliveryOrderModel.findByIdAndUpdate(req.params.id_do, {
                    $pull: { 'items': { _id: req.params.id_item_do } },
                }, { new: true });
                // Hapus item DO dari schema
                const deletedItemDO = yield item_do_model_1.ItemDeliveryOrderModel.findByIdAndDelete(req.params.id_item_do);
                // Update Item PO / Kembalikan quantityTaken 
                const updatedItemPO = yield item_po_model_1.ItemPurchaseOrderModel.findByIdAndUpdate(req.params.id_item_po, {
                    $inc: { 'quantityTaken': -foundItemDO.quantity, }
                }, { new: true });
                // Pull Item Array di PO dan push Item Array Baru
                const pulledItemArrayPO = yield po_model_1.PurchaseOrdeModel.findByIdAndUpdate(req.params.id_po, {
                    $pull: { 'items': { _id: req.params.id_item_po } },
                }, { new: true });
                const pushedItemArrayPO = yield po_model_1.PurchaseOrdeModel.findByIdAndUpdate(req.params.id_po, {
                    $push: { 'items': updatedItemPO },
                }, { new: true });
                // Update purchaseOrder yang ada di DO
                const updatedDO = yield do_model_1.deliveryOrderModel.findByIdAndUpdate(req.params.id_do, {
                    purchaseOrder: pushedItemArrayPO
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Delete Item Delivery Order`,
                    foundItemDO: foundItemDO,
                    foundDO: foundDO,
                    foundItemPO: foundItemPO,
                    foundPO: foundPO,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteDO = yield do_model_1.deliveryOrderModel.findByIdAndDelete(req.params.id_do);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Delete Delivery Order with this ID : ${req.params.id_do}`,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static endDeliveryOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const endedDeliveryOrder = yield do_model_1.deliveryOrderModel.findByIdAndUpdate(req.params.id_do, {
                    prosesStatus: 'finish',
                }, { new: true });
                // Update stok di 
                const foundDO = yield do_model_1.deliveryOrderModel.findById(req.params.id_do);
                const itemDO = foundDO.items;
                itemDO.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                    const foundUnit = yield unit_model_1.UnitModel.findByIdAndUpdate(item.unit, {
                        stock: item.quantity
                    }, { new: true });
                }));
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success Ended Delivery Order`,
                    data: foundDO,
                });
            }
            catch (error) {
                next(error);
                console.log(error);
            }
        });
    }
}
exports.default = deliveryOrderController;
