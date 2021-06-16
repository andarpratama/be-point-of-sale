import { NextFunction, Request, Response } from "express";
import { IPurchaseOrder } from "../interfaces/IPurchaseOrder";
import { deliveryOrderModel } from "../models/do.model";
import { ItemDeliveryOrderModel } from "../models/item.do.model";
import { ItemPurchaseOrderModel } from "../models/item.po.model";
import { PurchaseOrdeModel } from "../models/po.model";
import { UnitModel } from "../models/unit.model";

class deliveryOrderController {
   static async home(req: Request, res: Response, next: NextFunction) {
      try {
         const doData = await deliveryOrderModel.find().sort({created_at: 'desc'})
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Get All Data Delivery Order`,
            data: doData
         });
      } catch (error) {
         next(error)
      }
   }

   static async getOne(req: Request, res: Response, next: NextFunction) {
      try {
         const oneDO = await deliveryOrderModel.findById(req.params.id_do)
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Get Spesific Data Delivery Order`,
            data: oneDO
         });
      } catch (error) {
         next(error)
      }
   }

   static async create(req: Request, res: Response, next: NextFunction) {
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

      let no_do:any
      let tanggal = new Date().getDate()
      let bulan = new Date().getMonth()
      let tahun:any = new Date().getFullYear()
      tahun += ""
      
      const deliveryOrder:any = await deliveryOrderModel.find()
      if (!deliveryOrder[0]) {
         no_do = 'DO' + tahun.slice(2) + next_id(tanggal) + next_id(bulan) + '001'
      } else {
         const no_deliveryOrder = deliveryOrder.pop().no_do
         no_do = 'DO' + tahun.slice(2) + next_id(tanggal) + next_id(bulan) + next_id2(no_deliveryOrder.slice(8))
      }

       const purchaseOrderItem = await PurchaseOrdeModel.findById(req.body.purchaseOrder)

      try {
         // Validasi jika tamnbah PO yang sama
         const dataDO:any =  await deliveryOrderModel.find()
         dataDO.forEach((item:any) => {
            const purchaseID = item.purchaseOrder._id
            if (req.body.purchaseOrder == purchaseID) {
               throw { name: "Data Has Been Addedd" };
            }
         });

         const newDeliveryOrder = await deliveryOrderModel.create({
            no_do: no_do,
            purchaseOrder: purchaseOrderItem,
         })
         

         res.status(201).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: `CREATE Delivery Order`,
            data: newDeliveryOrder
         });
      } catch (error) {
         next(error)
      }
   }

   static async update(req: Request, res: Response, next: NextFunction) {
      const id_do = req.params.id_do;
      const updateData: any = {
         purchaseOrder: req.body.purchaseOrder,
         addressCompany: req.body.addressCompany
      };

      for (const key in updateData) {
         if (!updateData[key]) {
            delete updateData[key];
         }
      }

      try {
         const updateDO = await deliveryOrderModel.findByIdAndUpdate(
            id_do,
            updateData,
            { new: true }
         );

         res.status(20).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Success Update Delivery Order`,
            data: updateDO
         });
      } catch (error) {
         next(error)
      }
   }

   static async addItem(req: Request, res: Response, next: NextFunction) {
      const product = req.body.product
      const unit = req.body.unit
      const quantity = parseInt(req.body.quantity)
      const id_item_po = req.body.id_item_po
      const id_po = req.body.id_po
      try {

         // Validasi jika product sudaha ada di Item Delivery Order
         const thisPO:any = await deliveryOrderModel.findById(req.params.id_do)
         thisPO.items.forEach((item:any) => {
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
         const foundItemPO:any = await ItemPurchaseOrderModel.findById(id_item_po)
         const quantityPO = parseInt(foundItemPO.quantity)
         const quantityTakenPO = parseInt(foundItemPO.quantityTaken)
         const quantityFix = quantityPO - quantityTakenPO

         if (quantity > quantityFix) {
            throw { name: "Valid Quantity Delivery Order" };
         }

         // Simpan Data ke Schema Item Delivery Order
         const addedItemDO = await ItemDeliveryOrderModel.create({
            product: product,
            unit: unit,
            quantity: quantity,
            id_po: id_po,
            id_item_po: id_item_po,
         })

         // Update quantityTaken di Item Purchase Order
         const updatedItemPO:any = await ItemPurchaseOrderModel.findByIdAndUpdate(foundItemPO._id, {
            $inc: {'quantityTaken': quantity, }
         }, {new: true})

         // Pull Item Array di PO dan push Item Array Baru
         const pulledItemArrayPO = await PurchaseOrdeModel.findByIdAndUpdate(id_po, {
            $pull: { 'items': { _id: id_item_po } },
         }, { new: true })
         const pushedItemArrayPO:any = await PurchaseOrdeModel.findByIdAndUpdate( id_po,{
            $push: { 'items': updatedItemPO },
         }, {new: true})


         // Push Item ke Schema Delivery Order
         const pushedItemDO = await deliveryOrderModel.findByIdAndUpdate(req.params.id_do, {
            purchaseOrder: pushedItemArrayPO,
            $push: { 'items': addedItemDO },
         }, {new: true})


         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Success Add Item Delivery Order`,
            data: addedItemDO,
            dataPO: updatedItemPO,
            dataDO: pushedItemDO
         });
      } catch (error) {
         next(error)
         console.log(error)
      }
   }

   static async deleteItem(req: Request, res: Response, next: NextFunction) {
      try {
         // Cek semua params work
         const foundItemDO:any = await ItemDeliveryOrderModel.findById(req.params.id_item_do)
         const foundDO = await deliveryOrderModel.findById(req.params.id_do)
         const foundItemPO:any = await ItemPurchaseOrderModel.findById(req.params.id_item_po)
         const foundPO:any = await PurchaseOrdeModel.findById(req.params.id_po)
         
         // Hapus item DO dari array items DO
         const pulledItemDO = await deliveryOrderModel.findByIdAndUpdate(req.params.id_do, {
            $pull: { 'items': { _id: req.params.id_item_do } },
         }, {new: true})
         
         // Hapus item DO dari schema
         const deletedItemDO = await ItemDeliveryOrderModel.findByIdAndDelete(req.params.id_item_do)
         
         // Update Item PO / Kembalikan quantityTaken 
         const updatedItemPO = await ItemPurchaseOrderModel.findByIdAndUpdate(req.params.id_item_po, {
            $inc: {'quantityTaken': - foundItemDO.quantity, }
         }, {new: true})

         // Pull Item Array di PO dan push Item Array Baru
         const pulledItemArrayPO = await PurchaseOrdeModel.findByIdAndUpdate(req.params.id_po, {
            $pull: { 'items': { _id: req.params.id_item_po } },
         }, { new: true })
         const pushedItemArrayPO:any = await PurchaseOrdeModel.findByIdAndUpdate( req.params.id_po,{
            $push: { 'items': updatedItemPO },
         }, { new: true })
         
         // Update purchaseOrder yang ada di DO
         const updatedDO = await deliveryOrderModel.findByIdAndUpdate(req.params.id_do, {
            purchaseOrder: pushedItemArrayPO
         }, {new: true})

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
      } catch (error) {
         next(error)
      }
   }

   static async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const deleteDO = await deliveryOrderModel.findByIdAndDelete(req.params.id_do)
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Success Delete Delivery Order with this ID : ${req.params.id_do}`,
         });
      } catch (error) {
         next(error)
      }
   }

   static async endDeliveryOrder(req: Request, res: Response, next: NextFunction) {
      try {
         const endedDeliveryOrder = await deliveryOrderModel.findByIdAndUpdate(req.params.id_do, {
            prosesStatus: 'finish',
         }, { new: true })

         // Update stok di 
         const foundDO:any = await deliveryOrderModel.findById(req.params.id_do)
         const itemDO = foundDO.items
         itemDO.forEach(async (item:any) => {
            const foundUnit = await UnitModel.findByIdAndUpdate(item.unit, {
               stock: item.quantity
            }, {new:true})
         });
         
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Success Ended Delivery Order`,
            data: foundDO,
         });
      } catch (error) {
         next(error)
         console.log(error)
      }
   }


}

export default deliveryOrderController;