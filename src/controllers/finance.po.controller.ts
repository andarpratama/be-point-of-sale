import { NextFunction, Request, Response } from "express";
import { PoModel } from "../models/po.model";

class FinancePoController {
    static async postFinancePo(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { code, quantity } = req.body;
        const allbody = { code, quantity };
        try {
            if (!allbody) {
                throw { name: "Input body Required" };
            }
            const newPo = await PoModel.create({
                code: code,
                quantity: quantity,
            });
            res.status(201).json({
                success: true,
                statusCode: 201,
                responseStatus: "Status OK",
                message: `PO ${code} Created`,
                data: newPo,
            });
        } catch (error) {
            next(error);
        }
    }
    static getFinancePo(req: Request, res: Response, next: NextFunction) {
        PoModel.find()
            .then((resPo) => {
                res.status(201).json({
                    message: "Success Find All PO",
                    data: resPo,
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    static async editFinancePo(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const poID = req.params.id;
            const editDataPo: any = {
                code: req.body.code,
                quantity: req.body.quantity,
            };

            for (const key in editDataPo) {
                if (!editDataPo[key]) {
                    delete editDataPo[key];
                }
            }
            const updateDataPo = await PoModel.findByIdAndUpdate(
                poID,
                editDataPo,
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: `Success edit PO`,
                data: updateDataPo,
            });
        } catch (error) {
            next(error);
        }
    }
    static async deleteFinancePo(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const poID = req.params.id;
        const foundPo = await PoModel.findById(poID);

        try {
            if (!poID) {
                throw { name: "Params Is Empty" };
            }
            if (!foundPo) {
                throw { name: "Data Not Found" };
            }
            const updateStatus = await PoModel.findByIdAndUpdate(
                poID,
                { status: false },
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Delete Inventory PO",
                data: updateStatus,
            });
        } catch (error) {
            next(error);
        }
    }
    static async getDetailFinancePo(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const detailPo = await PoModel.findById(req.params.id);
            return res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Get Detail PO",
                data: detailPo,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default FinancePoController;
