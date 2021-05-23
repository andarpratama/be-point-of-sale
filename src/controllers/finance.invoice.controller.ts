import { NextFunction, Request, Response } from "express";
import { InvoiceModel } from "../models/invoice.model";

class FinanceInvoiceController {
    static async postFinanceInvoice(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { noInvoice, deliveryDate, deliveredDate } = req.body;
        const allbody = { noInvoice, deliveryDate, deliveredDate };
        try {
            if (!allbody) {
                throw { name: "Input body Required" };
            }
            const newInvoice = await InvoiceModel.create({
                noInvoice: noInvoice,
                deliveryDate: deliveryDate,
                deliveredDate: deliveredDate,
            });
            res.status(201).json({
                success: true,
                statusCode: 201,
                responseStatus: "Status OK",
                message: `Invoice ${noInvoice} Created`,
                data: newInvoice,
            });
        } catch (error) {
            next(error);
        }
    }
    static getFinanceInvoice(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Invoice Data",
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
