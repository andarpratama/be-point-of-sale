import { Request, Response } from "express";

class InventoryBrandController {
    static getInventoryBrand(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Inventory Brand Data",
        });
    }
    static postInventoryBrand(req: Request, res: Response) {
        res.status(201).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: "Inventory Brand Created",
        });
    }
    static editInventoryBrand(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Edit Inventory Brand",
        });
    }
    static deleteInventoryBrand(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Delete Inventory Brand",
        });
    }
}

export default InventoryBrandController;
