import { Request, Response, NextFunction } from 'express'
import { CompanyModel } from '../models/company.model';
import { EstatementModel } from '../models/estatement.model';
import { InvoiceModel } from "../models/invoice.model";
import { PurchaseOrdeModel } from '../models/po.model';

class InventoryInvoice {
   static async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const allInvoice =  await InvoiceModel.find().sort({created_at: 'desc'})
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Success get all Invoice",
            data: allInvoice
         });
      } catch (error) {
         next(error)
      }
   }
 
   static async getOne(req: Request, res: Response, next: NextFunction) {
      try {
         const foundInvoice =  await InvoiceModel.findById(req.params.id)
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Success get detail Invoice",
            data: foundInvoice
         });
      } catch (error) {
         next(error)
      }
   }

   static async create(req: Request, res: Response, next: NextFunction) {
      const purchasOrderID = req.body.purchasOrderID
      const requestUser = req.body.requestUser
      const company: any = await CompanyModel.findById('60c68f5f7816a512d4042920')

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

      let noInvoice:any
      let tanggal = new Date().getDate()
      let bulan = new Date().getMonth()
      let tahun:any = new Date().getFullYear()
      tahun += "" 
      
      const invoiceData:any = await InvoiceModel.find()
      if (!invoiceData[0]) {
         noInvoice = 'INV' + tahun.slice(2) + next_id(tanggal) + next_id(bulan) + '001'
      } else {
         const no_invoiceData = invoiceData.pop().noInvoice
         noInvoice = 'INV' + tahun.slice(2) + next_id(tanggal) + next_id(bulan) + next_id2(no_invoiceData.slice(9))
      }

      const foundPO:any = await PurchaseOrdeModel.findById(purchasOrderID)
      const price = parseInt(foundPO.totalPrice)
      
      try {
         // Validasi jika product sudaha ada di Item Delivery Order
         const AllInvoice:any = await InvoiceModel.find()
         AllInvoice.forEach((item:any) => {
            if (purchasOrderID == item.purchasOrderID) {
               throw { name: "Data Has Been Addedd" };
            }
         });
            
         const newInvoice = await InvoiceModel.create({
            noInvoice: noInvoice,
            purchasOrderID: purchasOrderID,
            requestUser: requestUser,
            company: company._id,
            price: price
         })

         res.status(201).json({
            success: true,
            statusCode: 201,
            responseStatus: "Success Create Invoice",
            data: newInvoice
         });

      } catch (error) {
         next(error)
      }
   }

   static async paidInvoice(req: Request, res: Response, next: NextFunction) {
      try {
         const paidInvoice:any = await InvoiceModel.findByIdAndUpdate(req.params.id_invoice, {
            prosesStatus: 'paid'
         }, { new: true })

         const purchasOrderID = paidInvoice.purchasOrderID
         const updatedStatusPO = await PurchaseOrdeModel.findByIdAndUpdate(purchasOrderID, {
            prosesStatus: 'paid'
         }, { new: true })

         const outcomeInvoice = await EstatementModel.create({
            name: 'Invoice' + ' ' + paidInvoice.noInvoice,
            credit: paidInvoice.price,
         })
         
         res.status(201).json({
            success: true,
            statusCode: 201,
            responseStatus: "Success Paid Invoice",
            data: paidInvoice,
            outcomeInvoice: outcomeInvoice,
            updatedStatusPO: updatedStatusPO
         });
      } catch (error) {
         next(error)
      }
   }

   static delete(req: Request, res: Response, next: NextFunction) {
      res.status(200).json({
         message: 'OK'
      })
   }

}

export default InventoryInvoice;