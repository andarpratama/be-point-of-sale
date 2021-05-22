import { Request, Response } from "express";
import { BrandModel } from "../models/brand.model";

class InventoryBrandController {
    //============================= CREATE REQUEST =============================
    static async postInventoryBrand(req: Request, res: Response) {
        const name = req.body.name;

        try {
            if (!name) {
                res.status(403).json({
                    success: false,
                    statusCode: 403,
                    responseStatus: "Status not OK",
                    message: "Please Fill the Brand Name",
                });
            } else {
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
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                responseStatus: "Status not OK",
                message: "Failed to Create Brand Name",
            });
        }
    }
    //============================= END OF CREATE REQUEST ======================

    //============================= READ REQUEST ===============================
    static getInventoryBrand(req: Request, res: Response) {
        BrandModel.find()
            .then((resBrand) => {
                res.status(201).json({
                    message: "Success Find All Brand",
                    data: resBrand,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Find All Brand Failed",
                    data: err,
                });
            });
    }
    //============================= END OF READ REQUEST ========================

    static async editInventoryBrand(req: Request, res: Response) {
        const brandID = req.params.id;
        const name = req.body.name;

        try {
            const updateName = await BrandModel.findByIdAndUpdate(
                brandID,
                {
                    name: name,
                },
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: `Success edit brand name to ${updateName?.name}`,
                data: updateName,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                responseStatus: "Status not OK",
                message: "Update Brand Name Failed",
            });
        }
    }

    static async deleteInventoryBrand(req: Request, res: Response) {
        const brandID = req.params.id;
        const foundBrand = await BrandModel.findById(brandID);

        try {
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
            res.status(500).json({
                success: false,
                statusCode: 500,
                responseStatus: "Status not OK",
                message: "Delete Brand Failed",
            });
        }
    }
}

export default InventoryBrandController;
