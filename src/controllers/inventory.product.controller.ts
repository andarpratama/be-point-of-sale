import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { BrandModel } from "../models/brand.model";

class InventoryProductController {
    static async postInventoryProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { name, image, brandID } = req.body;
        const allbody = { name, image, brandID };
        let codeProduct: any

        let codeBrand:any = await BrandModel.findById(brandID)
        let foundBrand:any = await BrandModel.findById(brandID)
        codeBrand = codeBrand.code

        
        function next_id(input:string) {
            var output:any = parseInt(input, 10) + 1; // parse and increment
            output += ""; // convert to string
            while (output.length < 2) output = "00" + output; // prepend leading zeros
            return output;
         }
         let allProduct:any = await ProductModel.find()
         let lastProduct = allProduct.pop()
         if (lastProduct) {
            // console.log('ada')
            codeProduct = next_id(lastProduct.code.slice(5))
         }
         else {
            codeProduct = '001'
            // console.log('empty')
         }
         
         // console.log(codeProduct)
       
         try {
            if (!allbody) {
                throw { name: "Input body Required" };
            }
            const newProduct = await ProductModel.create({
                code: 'PRD' + codeBrand + codeProduct,
                name: name,
                image: image,
                brandID: foundBrand
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
