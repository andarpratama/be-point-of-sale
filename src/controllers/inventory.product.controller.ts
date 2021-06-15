import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { BrandModel } from "../models/brand.model";
import multer from "multer";
import path from "path";
import { UnitModel } from "../models/unit.model";

let imageName!:string

const storage = multer.diskStorage({
   destination: './public/img',
   filename: (req, file, callBack) => {
      callBack(null, 'product' + '-' + Date.now() + path.extname(file.originalname));
   }
})

const upload = multer({ storage: storage }).single('imageProduct')

class InventoryProductController {
    static async postInventoryProduct( req: Request, res: Response,next: NextFunction) {
        const { name, image, brandID } = req.body;
        const allbody = { name, image, brandID };
        let codeProduct: any

        let codeBrand:any = await BrandModel.findById(brandID)
        let foundBrand:any = await BrandModel.findById(brandID)
        codeBrand = codeBrand.code
        codeBrand = codeBrand.slice(5)
        
         function next_id(input:string) {
            var output:any = parseInt(input, 10) + 1; // parse and increment
            output += ""; // convert to string
            while (output.length < 3) output = "0" + output; // prepend leading zeros
            return output;
         }
         let allProduct:any = await ProductModel.find()
         let lastProduct = allProduct.pop()
         if (lastProduct) {
            codeProduct = next_id(lastProduct.code.slice(6))
         }
         else {
            codeProduct = '001'
         }
       
         try {
            if (!allbody) {
                throw { name: "Input body Required" };
            }
            const hostname = req.headers.host;

            const newProduct = await ProductModel.create({
                code: 'PRD' + codeBrand + codeProduct,
                name: name,
                image: `http://${hostname}/public/img/image.png`,
                brandID: foundBrand,
                statusProduct: 'active'
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
            console.log(error)
        }
    }
   
   static async uploadImage(req: Request, res: Response, next: NextFunction) {
      const productID = req.params.id_product
      try {
         upload(req, res, async (error:any) => {
            if (error) {
               throw { name: "Failed Upload Image" };
            } else {
               const hostname = req.headers.host;
               const imageURL = 'http://' + hostname + '/' + req.file.path
               const uploadedImage = await ProductModel.findByIdAndUpdate(productID, {
                  image: imageURL
               }, { new: true })
               
                res.status(201).json({
                  success: true,
                  statusCode: 201,
                  responseStatus: "Status OK",
                  message: `Upload Image`,
                  data: uploadedImage,
                  imageURL: imageURL
               });
            }
         })
      } catch (error) {
         next(error)
         console.log(error)
      }
   }
    
    static getInventoryProduct(req: Request, res: Response, next: NextFunction) {
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
   
    static async activeProduct(req: Request, res: Response, next: NextFunction) {
       try {
          const activeProduct = await ProductModel.findByIdAndUpdate(req.params.id_product, {
            statusProduct: 'active'
          }, { new: true })
          
          res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Active Product`,
            data: activeProduct
          });

       } catch (error) {
          next(error)
          console.log(error)
       }
    }
   
   static async unactiveProduct(req: Request, res: Response, next: NextFunction) {
       try {
           const unactiveProduct = await ProductModel.findByIdAndUpdate(req.params.id_product, {
            statusProduct: 'unactive'
           }, { new: true })
          
          res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: `Unactive Product`,
            data: unactiveProduct
          });
       } catch (error) {
          next(error)
          console.log(error)
       }
    }

    static async editInventoryProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productID = req.params.id;
            const editDataProduct: any = {
                code: req.body.code,
                name: req.body.name,
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
    static async deleteInventoryProduct(req: Request, res: Response, next: NextFunction) {
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
    static async getDetailInventoryProduct(req: Request, res: Response, next: NextFunction) {
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
   
   static async getDetailByCode(req: Request, res: Response, next: NextFunction) {
        try {
            const detailProduct = await ProductModel.findOne({code: req.params.code});
            return res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Get Detail Product by Code",
                data: detailProduct,
            });
        } catch (error) {
            next(error);
        }
   }
   
   static async getTopTen(req: Request, res: Response, next: NextFunction) {
      try {
         const topTenProduct = await UnitModel.find({}).sort({
            soldCount: -1
         })
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Top ten Product",
            data:topTenProduct
         });
      } catch (error) {
         next(error)
      }
   }
}

export default InventoryProductController;
