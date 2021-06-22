"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../models/product.model");
const brand_model_1 = require("../models/brand.model");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const unit_model_1 = require("../models/unit.model");
let imageName;
const storage = multer_1.default.diskStorage({
    destination: './public/img',
    filename: (req, file, callBack) => {
        callBack(null, 'product' + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = multer_1.default({ storage: storage }).single('imageProduct');
class InventoryProductController {
    static postInventoryProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, image, brandID } = req.body;
            const allbody = { name, image, brandID };
            let codeProduct;
            let codeBrand = yield brand_model_1.BrandModel.findById(brandID);
            let foundBrand = yield brand_model_1.BrandModel.findById(brandID);
            codeBrand = codeBrand.code;
            codeBrand = codeBrand.slice(5);
            function next_id(input) {
                var output = parseInt(input, 10) + 1; // parse and increment
                output += ""; // convert to string
                while (output.length < 3)
                    output = "0" + output; // prepend leading zeros
                return output;
            }
            let allProduct = yield product_model_1.ProductModel.find();
            let lastProduct = allProduct.pop();
            if (lastProduct) {
                codeProduct = next_id(lastProduct.code.slice(6));
            }
            else {
                codeProduct = '001';
            }
            try {
                if (!allbody) {
                    throw { name: "Input body Required" };
                }
                const hostname = req.headers.host;
                const newProduct = yield product_model_1.ProductModel.create({
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
            }
            catch (error) {
                next(error);
                console.log(error);
            }
        });
    }
    static filterProductByBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filterProduct = yield product_model_1.ProductModel.find({
                    'brandID._id': req.params.brand
                });
                console.log(filterProduct);
                // filterProduct.forEach((item:any) => {
                //    console.log(item.brandID._id)
                // });
                // const filterProduct = await ProductModel.find({}).sort({
                //    soldCount: -1
                // })
                res.status(201).json({
                    success: true,
                    statusCode: 201,
                    responseStatus: "Status OK",
                    message: `Success filter `,
                    data: filterProduct
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productID = req.params.id_product;
            try {
                upload(req, res, (error) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        throw { name: "Failed Upload Image" };
                    }
                    else {
                        const hostname = req.headers.host;
                        const imageURL = 'http://' + hostname + '/' + req.file.path;
                        const uploadedImage = yield product_model_1.ProductModel.findByIdAndUpdate(productID, {
                            image: imageURL
                        }, { new: true });
                        res.status(201).json({
                            success: true,
                            statusCode: 201,
                            responseStatus: "Status OK",
                            message: `Upload Image`,
                            data: uploadedImage,
                            imageURL: imageURL
                        });
                    }
                }));
            }
            catch (error) {
                next(error);
                console.log(error);
            }
        });
    }
    static getInventoryProduct(req, res, next) {
        product_model_1.ProductModel.find().sort({ created_at: 'desc' })
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
    static activeProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activeProduct = yield product_model_1.ProductModel.findByIdAndUpdate(req.params.id_product, {
                    statusProduct: 'active'
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Active Product`,
                    data: activeProduct
                });
            }
            catch (error) {
                next(error);
                console.log(error);
            }
        });
    }
    static unactiveProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unactiveProduct = yield product_model_1.ProductModel.findByIdAndUpdate(req.params.id_product, {
                    statusProduct: 'unactive'
                }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Unactive Product`,
                    data: unactiveProduct
                });
            }
            catch (error) {
                next(error);
                console.log(error);
            }
        });
    }
    static editInventoryProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productID = req.params.id;
                const editDataProduct = {
                    code: req.body.code,
                    name: req.body.name,
                };
                for (const key in editDataProduct) {
                    if (!editDataProduct[key]) {
                        delete editDataProduct[key];
                    }
                }
                const updateDataProduct = yield product_model_1.ProductModel.findByIdAndUpdate(productID, editDataProduct, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: `Success edit Product`,
                    data: updateDataProduct,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteInventoryProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productID = req.params.id;
            const foundProduct = yield product_model_1.ProductModel.findById(productID);
            try {
                if (!productID) {
                    throw { name: "Params Is Empty" };
                }
                if (!foundProduct) {
                    throw { name: "Data Not Found" };
                }
                const updateStatus = yield product_model_1.ProductModel.findByIdAndUpdate(productID, { status: false }, { new: true });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Delete Inventory Product",
                    data: updateStatus,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getDetailInventoryProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detailProduct = yield product_model_1.ProductModel.findById(req.params.id);
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Get Detail Product",
                    data: detailProduct,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getDetailByCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detailProduct = yield product_model_1.ProductModel.findOne({ code: req.params.code });
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Get Detail Product by Code",
                    data: detailProduct,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getTopTen(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topTenProduct = yield unit_model_1.UnitModel.find({}).sort({
                    soldCount: -1
                }).limit(10);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "Get Top ten Product",
                    data: topTenProduct
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = InventoryProductController;
