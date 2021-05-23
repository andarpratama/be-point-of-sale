import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../models/order.model";

class OrderController {
    static async postOrder(req: Request, res: Response, next: NextFunction) {
        const { code, tax, totalPrice } = req.body;
        const allbody = { code, tax, totalPrice };
        try {
            if (!allbody) {
                throw { name: "Input body Required" };
            }
            const newOrder = await OrderModel.create({
                code: code,
                tax: tax,
                totalPrice: totalPrice,
            });
            res.status(201).json({
                success: true,
                statusCode: 201,
                responseStatus: "Status OK",
                message: `Order ${code} Created`,
                data: newOrder,
            });
        } catch (error) {
            next(error);
        }
    }
    static getOrder(req: Request, res: Response, next: NextFunction) {
        OrderModel.find()
            .then((resOrder) => {
                res.status(201).json({
                    message: "Success Find All Order",
                    data: resOrder,
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    static async editOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderID = req.params.id;
            const editDataOrder: any = {
                code: req.body.code,
                tax: req.body.tax,
                totalPrice: req.body.totalPrice,
            };

            for (const key in editDataOrder) {
                if (!editDataOrder[key]) {
                    delete editDataOrder[key];
                }
            }
            const updateDataOrder = await OrderModel.findByIdAndUpdate(
                orderID,
                editDataOrder,
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: `Success edit Order`,
                data: updateDataOrder,
            });
        } catch (error) {
            next(error);
        }
    }
    static async deleteOrder(req: Request, res: Response, next: NextFunction) {
        const orderID = req.params.id;
        const foundOrder = await OrderModel.findById(orderID);

        try {
            if (!orderID) {
                throw { name: "Params Is Empty" };
            }
            if (!foundOrder) {
                throw { name: "Data Not Found" };
            }
            const updateStatus = await OrderModel.findByIdAndUpdate(
                orderID,
                { status: false },
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Delete Inventory Order",
                data: updateStatus,
            });
        } catch (error) {
            next(error);
        }
    }
    static async getDetailOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const detailOrder = await OrderModel.findById(req.params.id);
            return res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Get Detail Order",
                data: detailOrder,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default OrderController;
