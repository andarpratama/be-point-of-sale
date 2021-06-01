import { NextFunction, Request, Response } from "express";
import { deliveryOrderModel } from "../models/do.model";

class deliveryOrderController {
   static async home(req: Request, res: Response, next: NextFunction) {
      try {
         const doData = await deliveryOrderModel.find()
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Get All Data Delivery Order`,
            doData: doData
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
            doData: oneDO
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


      try {
         const newDeliveryOrder = await deliveryOrderModel.create({
            no_do: no_do,
            purchaseOrder: req.body.purchaseOrder,
            addressCompany: req.body.addressCompany
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


}

export default deliveryOrderController;