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
                code: code,
                name: name,
                image: image,
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
    static getInventoryProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        ProductModel.find()
            .then((resProduct) => {
                res.status(201).json({
                    message: "Success Find All Product",
                    data: resProduct,
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    static async editInventoryProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const productID = req.params.id;
            const editDataProduct: any = {
                code: req.body.code,
                name: req.body.name,
                image: req.body.image,
            };

            for (const key in editDataProduct) {
                if (!editDataProduct[key]) {
                    delete editDataProduct[key];
                }
            }
            const updateDataProduct = await ProductModel.findByIdAndUpdate(
                productID,
                editDataProduct,
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: `Success edit Product`,
                data: updateDataProduct,
            });
        } catch (error) {
            next(error);
        }
    }
    static async deleteInventoryProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const productID = req.params.id;
        const foundProduct = await ProductModel.findById(productID);

        try {
            if (!productID) {
                throw { name: "Params Is Empty" };
            }
            if (!foundProduct) {
                throw { name: "Data Not Found" };
            }
            const updateStatus = await ProductModel.findByIdAndUpdate(
                productID,
                { status: false },
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Delete Inventory Product",
                data: updateStatus,
            });
        } catch (error) {
            next(error);
        }
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
