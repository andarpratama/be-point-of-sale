import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../models/product.model";

class InventoryProductController {
    static async postInventoryProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { code, name, image } = req.body;
        const allbody = { code, name, image };
        try {
            if (!allbody) {
                throw { name: "Input body Required" };
            }
            const newProduct = await ProductModel.create({
                allbody,
            });
            res.status(201).json({
                success: true,
                statusCode: 201,
                responseStatus: "Status OK",
                message: `Product ${name} Created`,
                data: newProduct,
            });
        } catch (error) {
            next(error);
        }
    }
    static getInventoryProduct(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Inventory Product Data",
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
    static async getDetailInventoryProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const detailProduct = await ProductModel.findById(req.params.id);
            return res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Get Detail Product",
                data: detailProduct,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default InventoryProductController;
