import { Request, Response } from "express";

class FinancePoController {
    static getFinancePo(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Purchase Order Data",
        });
    }
    static postFinancePo(req: Request, res: Response) {
        res.status(201).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: "Purchase Order Created",
        });
    }
    static editFinancePo(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Edit Purchase Order",
        });
    }
    static deleteFinancePo(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Delete Purchase Order",
        });
    }
    static getDetailFinancePo(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Detail Purchase Order Data",
        });
    }
}

export default FinancePoController;
