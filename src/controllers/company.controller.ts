import { Request, Response, NextFunction } from 'express'
import { CompanyModel } from "../models/company.model";

class Company {
   static async getOne(req: Request, res: Response, next: NextFunction) {
      const idCompany = '60c68f5f7816a512d4042920'
      try {
         const foundOneCompany = await CompanyModel.findById(idCompany)
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Success Find One Company",
            data: foundOneCompany,
         });
      } catch (error) {
         
      }
   }

   static getAll(req: Request, res: Response, next: NextFunction) {
      CompanyModel.find()
            .then((resCompany) => {
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Success Find All Company",
                    data: resCompany,
                });
            })
            .catch((err) => {
                next(err);
            });
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

   static async update(req: Request, res: Response, next: NextFunction) {
      try {
         const companyID = req.params.id;
         const editDataCompany: any = {
             name: req.body.name,
             address: req.body.address,
             logo: req.body.logo,
             handphone: req.body.handphone,
         };

         for (const key in editDataCompany) {
             if (!editDataCompany[key]) {
                 delete editDataCompany[key];
             }
         }
         const updateDataCompany = await CompanyModel.findByIdAndUpdate(
             companyID,
             editDataCompany,
             { new: true }
         );
         res.status(200).json({
             success: true,
             statusCode: 200,
             responseStatus: "Status OK",
             message: `Success edit Company`,
             data: updateDataCompany,
         });
     } catch (error) {
         next(error);
     }
   }

   static async delete(req: Request, res: Response, next: NextFunction) {
      const companyID = req.params.id;
      const foundCompany = await CompanyModel.findById(companyID);

      try {
            if (!companyID) {
               throw { name: "Params Is Empty" };
            }
            if (!foundCompany) {
            throw { name: "Data Not Found" };
            }
      const updateStatus = await CompanyModel.findByIdAndUpdate( companyID, { status: false, name: foundCompany?.name }, { new: true });
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Delete Company",
                data: updateStatus,
            });
        } catch (error) {
            next(error);
        }
   }

}

export default Company;