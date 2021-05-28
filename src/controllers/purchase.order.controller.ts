import { NextFunction, Request, Response } from "express";
import { PurchaseOrdeModel } from "../models/po.model";
import { ItemPurchaseOrderModel } from "../models/item.po.model";

class PurchaseOrderController {
   static async home(req: Request, res: Response, next: NextFunction) {
      try {
         const purchase_orders = await PurchaseOrdeModel.find()
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Success Get All Purchase Order`,
            data: purchase_orders
         });
      } catch (error) {
         next(error)
      }
      
   }

   static async getOne(req: Request, res: Response, next: NextFunction) {
      try {
         const found_purchase_orders = await PurchaseOrdeModel.findById(req.params.id)
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Success Get Spesific Purchase Order`,
            data: found_purchase_orders
         });
      } catch (error) {
         next(error)
      }
   }

   static async addItem(req: Request, res: Response, next: NextFunction) {
      try {
         const addedItem = await ItemPurchaseOrderModel.create({
            product: req.body.product,
            unit: req.body.unit,
            quantity: req.body.quantity,
            buyPrice: req.body.buyPrice
         })

         const pushedItem = await PurchaseOrdeModel.findByIdAndUpdate(req.params.id, {
            $push: { 'items': addedItem._id}
         }, {new: true})

         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Success Add Item to Purchase Order`,
            dataItem: addedItem,
            dataPO: pushedItem
         });
      } catch (error) {
         next(error)
      }
   }

   static async deleteItem(req: Request, res: Response, next: NextFunction) {
      try {
         const deletedItem = await PurchaseOrdeModel.findByIdAndUpdate(req.params.id_po, {
            $pull: { 'items': req.params.id_item}
         }, {new: true})

         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Success Delete Item from Purchase Order`,
            dataPO: deletedItem
         });
      } catch (error) {
         next(error)
      }
   }

   static async createPurchaseOrder(req: Request, res: Response, next: NextFunction) {
      function next_id(input:any) {
         var output:any = parseInt(input, 10);
         output += "";
         while (output.length < 2) output = "0" + output;
         return output;
      }

      function next_id2(input:any) {
         var output:any = parseInt(input, 10) + 1;
         output += "";
         while (output.length < 3) output = "0" + output;
         return output;
      }

      let no_po:any
      let tanggal = new Date().getDate()
      let bulan = new Date().getMonth()
      let tahun:any = new Date().getFullYear()
      tahun += ""
      
      const purchaseOrder:any = await PurchaseOrdeModel.find()
      if (!purchaseOrder[0]) {
         no_po = 'PO' + tahun.slice(2) + next_id(tanggal) + next_id(bulan) + '001'
      } else {
         const no_purchaseOrder = purchaseOrder.pop().no_po
         no_po = 'PO' + tahun.slice(2) + next_id(tanggal) + next_id(bulan) + next_id2(no_purchaseOrder.slice(8))
         console.log(no_po)
      }
      
      
      try {
         const newPO = await PurchaseOrdeModel.create({
            no_po: no_po,
            supplierID: req.body.supplierID,
            requestUser: req.body.requestUser
         })

         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Success Create Purchase Order`,
            data: newPO,
         });
      } catch (error) {
         
      }
      
   }



}

export default PurchaseOrderController;