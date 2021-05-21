import { Request, Response } from "express";

class InventoryProductController {
    static getInventoryProduct(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Inventory Product Data",
        });
    }
    static postInventoryProduct(req: Request, res: Response) {
        res.status(201).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: "Inventory Product Created",
        });
    }
    static editInventoryProduct(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Edit Inventory Product",
        });
    }
    static deleteInventoryProduct(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Delete Inventory Product",
        });
    }
    static getDetailInventoryProduct(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Detail Inventory Product Data",
        });
    }
}

export default InventoryProductController;
