import { Request, Response, NextFunction } from 'express'
import { CompanyModel } from "../models/company.model";

class Company {
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

   static async create(req: Request, res: Response, next: NextFunction) {
      const {name, address, logo, handphone} = req.body

      try {
         const createdCopmany = await CompanyModel.create({name, address, logo, handphone})
         res.status(201).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            data: createdCopmany
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

export default Company;