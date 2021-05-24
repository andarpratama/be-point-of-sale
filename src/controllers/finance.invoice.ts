import { Request, Response, NextFunction } from 'express'
import { InvoiceModel } from "../models/invoice.model";

class InventoryInvoice {
   static getOne(req: Request, res: Response, next: NextFunction) {
      res.status(200).json({
         message: 'OK'
      })
   }

   static getAll(req: Request, res: Response, next: NextFunction) {
      res.status(200).json({
         message: 'OK'
      })
   }

   static create(req: Request, res: Response, next: NextFunction) {
      try {
         res.status(201).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
         });
      } catch (error) {
         
      }
   }

   static update(req: Request, res: Response, next: NextFunction) {
      res.status(200).json({
         message: 'OK'
      })
   }

   static delete(req: Request, res: Response, next: NextFunction) {
      res.status(200).json({
         message: 'OK'
      })
   }

}

export default InventoryInvoice;