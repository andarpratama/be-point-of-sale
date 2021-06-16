import { NextFunction, Request, Response } from "express";
import { SupplierModel } from "../models/supplier.model";

class InventorySupplierController {
    static async postInventorySupplier(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { name, address, handphone } = req.body;
        const allbody = { name, address, handphone };

        try {
            if (!allbody) {
                throw { name: "Input body Required" };
            }
            const newSupplier = await SupplierModel.create({
                name: name,
                address: address,
                handphone: handphone,
            });
            res.status(201).json({
                success: true,
                statusCode: 201,
                responseStatus: "Status OK",
                message: `Supplier ${name} Created`,
                data: newSupplier,
            });
        } catch (error) {
            next(error);
        }
    }
    static getInventorySupplier(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        SupplierModel.find().sort({created_at: 'desc'})
            .then((resSupplier) => {
                res.status(201).json({
                    message: "Success Find All Supplier",
                    data: resSupplier,
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    static async editInventorySupplier(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const supplierID = req.params.id;
            const editDataSupplier: any = {
                name: req.body.name,
                address: req.body.address,
                handphone: req.body.handphone,
            };

            for (const key in editDataSupplier) {
                if (!editDataSupplier[key]) {
                    delete editDataSupplier[key];
                }
            }
            const updateDataSupplier = await SupplierModel.findByIdAndUpdate(
                supplierID,
                editDataSupplier,
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: `Success edit Supplier`,
                data: updateDataSupplier,
            });
        } catch (error) {
            next(error);
        }
    }
    static async deleteInventorySupplier(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const supplierID = req.params.id;
        const foundSupplier = await SupplierModel.findById(supplierID);

        try {
            if (!supplierID) {
                throw { name: "Params Is Empty" };
            }
            if (!foundSupplier) {
                throw { name: "Data Not Found" };
            }
            const updateStatus = await SupplierModel.findByIdAndUpdate(
                supplierID,
                { status: false },
                { new: true }
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Delete Inventory Supplier",
                data: updateStatus,
            });
        } catch (error) {
            next(error);
        }
    }
    static async getDetailInventorySupplier(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const detailSupplier = await SupplierModel.findById(req.params.id);
            return res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Get Detail Supplier",
                data: detailSupplier,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default InventorySupplierController;
