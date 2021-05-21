import { Request, Response } from "express";

class InventoryUnitController {
    static getInventoryUnit(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Inventory Unit Data",
        });
    }
    static postInventoryUnit(req: Request, res: Response) {
        res.status(201).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: "Inventory Unit Created",
        });
    }
    static editInventoryUnit(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Edit Inventory Unit",
        });
    }
    static deleteInventoryUnit(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Delete Inventory Unit",
        });
    }
}

export default InventoryUnitController;
