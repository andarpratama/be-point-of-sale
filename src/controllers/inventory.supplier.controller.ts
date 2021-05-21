import { Request, Response } from "express";

class InventorySupplierController {
    static getInventorySupplier(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Inventory Supplier Data",
        });
    }
    static postInventorySupplier(req: Request, res: Response) {
        res.status(201).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: "Inventory Supplier Created",
        });
    }
    static editInventorySupplier(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Edit Inventory Supplier",
        });
    }
    static deleteInventorySupplier(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Delete Inventory Supplier",
        });
    }
    static getDetailInventorySupplier(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Detail Inventory Supplier Data",
        });
    }
}

export default InventorySupplierController;
