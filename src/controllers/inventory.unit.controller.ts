import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { UnitModel } from "../models/unit.model";

class InventoryUnitController {
    static async postInventoryUnit(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { name, alias, sellPrice, buyPrice, stock, productID } = req.body;
        const allbody = { name, alias, sellPrice, buyPrice,  productID };
        try {
            if (!allbody) {
                throw { name: "Input body Required" };
            }
           
            const foundProduct = await ProductModel.findById(productID)
            
            const newUnit = await UnitModel.create({
               name: name,
               alias: alias,
               sellPrice: sellPrice,
               buyPrice: buyPrice,
               productID: foundProduct
            });
           
            res.status(201).json({
                success: true,
                statusCode: 201,
                responseStatus: "Status OK",
                message: `Unit ${name} Created`,
                data: newUnit,
            });
        } catch (error) {
            next(error);
        }
    }
    static getInventoryUnit(req: Request, res: Response, next: NextFunction) {
        UnitModel.find()
            .then((resUnit) => {
                res.status(201).json({
                    message: "Success Find All Unit",
                    data: resUnit,
                });
            })
            .catch((err) => {
                next(err);
            });
    }
   
   static async getOneUnit(req: Request, res: Response, next: NextFunction) {
      try {
          const foundUnit = await UnitModel.findById(req.params.id)
          return res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Get unit with this id",
                data: foundUnit,
            });
       } catch (error) {
          next(error)
       }
    }

    static async editInventoryUnit(req: Request, res: Response, next: NextFunction) {
        const { name, alias, sellPrice, buyPrice, stock, productID } = req.body;
        const allbody = { name, alias, sellPrice, buyPrice,  productID };
        const unitID = req.params.id;
        try {
            if (!allbody) {
                throw { name: "Input body Required" };
            }
           
            const foundProduct = await ProductModel.findById(productID)
           
            const editDataUnit: any = {
               name: name,
               alias: alias,
               sellPrice: sellPrice,
               buyPrice: buyPrice,
               productID: foundProduct
            };

            for (const key in editDataUnit) {
                if (!editDataUnit[key]) {
                    delete editDataUnit[key];
                }
            }
            const updateDataUnit = await UnitModel.findByIdAndUpdate(
                unitID,
                editDataUnit,
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: `Success edit Unit`,
                data: updateDataUnit,
            });
        } catch (error) {
            next(error);
        }
    }
    static async deleteInventoryUnit(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const unitID = req.params.id;
        const foundUnit = await UnitModel.findById(unitID);

        try {
            if (!unitID) {
                throw { name: "Params Is Empty" };
            }
            if (!foundUnit) {
                throw { name: "Data Not Found" };
            }
            const updateStatus = await UnitModel.findByIdAndUpdate(
                unitID,
                { status: false },
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Delete Inventory Unit",
                data: updateStatus,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default InventoryUnitController;
