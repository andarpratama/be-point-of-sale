import { Request, Response } from "express";

class FinanceInvoiceController {
    static getFinanceInvoice(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Invoice Data",
        });
    }
    static postFinanceInvoice(req: Request, res: Response) {
        res.status(201).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: "Invoice Created",
        });
    }
    static editFinanceInvoice(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Edit Invoice",
        });
    }
    static deleteFinanceInvoice(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Delete Invoice",
        });
    }
    static getDetailFinanceInvoice(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Detail Invoice Data",
        });
    }
}

export default FinanceInvoiceController;
