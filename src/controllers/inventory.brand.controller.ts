import { NextFunction, Request, Response } from "express";
import { BrandModel } from "../models/brand.model";

class InventoryBrandController {
    //============================= CREATE REQUEST =============================
    static async postInventoryBrand(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const name = req.body.name;

        try {
            if (!name) {
                throw { name: "Input body Required" };
            }
            const newBrand = await BrandModel.create({
                name: name,
            });
            res.status(201).json({
                success: true,
                statusCode: 201,
                responseStatus: "Status OK",
                message: `Brand ${name} Created`,
                data: newBrand,
            });
        } catch (error) {
            next(error);
        }
    }
    //============================= END OF CREATE REQUEST ======================

    //============================= READ REQUEST ===============================
    static getInventoryBrand(req: Request, res: Response, next: NextFunction) {
        BrandModel.find()
            .then((resBrand) => {
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Success Find All Brand",
                    data: resBrand,
                });
            })
            .catch((err) => {
                next(err);
            });
    }
    //============================= END OF READ REQUEST ========================

    static async editInventoryBrand(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const brandID = req.params.id;
        const { name } = req.body;
        const editDataBrand = { name };
       
        try {
            if(!name){
               throw { name: 'Input body Required' };
            }
            const updateName = await BrandModel.findByIdAndUpdate(
                brandID,
                editDataBrand,
                { new: true }
            );
            res.status(201).json({
                success: true,
                statusCode: 201,
                responseStatus: "Status OK",
                message: `Success edit brand name to ${updateName?.name}`,
                data: updateName,
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteInventoryBrand(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const brandID = req.params.id;
        const foundBrand = await BrandModel.findById(brandID);

        try {
            if (!brandID) {
                throw { name: "Params Is Empty" };
            }
            if (!foundBrand) {
                throw { name: "Data Not Found" };
            }
            const updateStatus = await BrandModel.findByIdAndUpdate(
                brandID,
                { status: false, name: foundBrand?.name },
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Delete Inventory Brand",
                data: updateStatus,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default InventoryBrandController;
