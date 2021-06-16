import { Request, Response, NextFunction } from 'express'
import { EstatementModel } from '../models/estatement.model';

class FinanceReport {
   static async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const dataEstatement =  await EstatementModel.find().sort({created_at: 'desc'})
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Success get all Estatement",
            data: dataEstatement
         });
      } catch (error) {
         next(error)
      }
   }
 
   static async getOne(req: Request, res: Response, next: NextFunction) {
      try {
         const detailFinance =  await EstatementModel.findById(req.params.id)
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Success get detail Estatement",
            data: detailFinance
         });
      } catch (error) {
         next(error)
      }
   }

   static async getReportByDate(req: Request, res: Response, next: NextFunction) {
      const starDate: any = req.body.star_date;
      const endDate: any = req.body.end_date;
      const dateRange: object = { $gte: starDate, $lte: endDate }
      try {
         const financeReport = await EstatementModel.find({updated_at: dateRange})
         // getInvoices = await Invoice.find({ status: "paid", updatedAt: dateRange })
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Success get Data Estatement by Date",
            data: financeReport,
            starDate: starDate,
            endDate: endDate
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

export default FinanceReport;