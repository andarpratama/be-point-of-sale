import { Request, Response, NextFunction } from 'express'
import { EstatementModel } from '../models/estatement.model';

class FinanceReport {
   static async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const dataEstatement =  await EstatementModel.find()
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

   static delete(req: Request, res: Response, next: NextFunction) {
      res.status(200).json({
         message: 'OK'
      })
   }

}

export default FinanceReport;