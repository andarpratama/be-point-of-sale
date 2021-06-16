import { Router } from "express";
import InventoryProductController from "../controllers/inventory.product.controller";
import { UploadImage } from "../middlewares/upploadImage";
import multer from "multer";
import path from "path";

class InventoryProductRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.getInventoryProduct();
        this.postInventoryProduct();
        this.editInventoryProduct();
        this.deleteInventoryProduct();
        this.getDetailInventoryProduct();
        this.activeProduct()
        this.unactiveProduct()
        this.uploadImage()
        this.getDetailProductByCode()
        this.getTopTen()
        this.filterByBrand()
    }
    public getInventoryProduct(): void {
        this.router.get(
            "/product",
            InventoryProductController.getInventoryProduct
        );
    }
    public postInventoryProduct(): void {
        this.router.post(
            "/product",
            InventoryProductController.postInventoryProduct
        );
    }
    public activeProduct(): void {
        this.router.get("/product/active/:id_product", InventoryProductController.activeProduct);
    }
    public unactiveProduct(): void {
        this.router.get("/product/unactive/:id_product", InventoryProductController.unactiveProduct);
    }
    public uploadImage(): void {
        this.router.post("/product/upload/:id_product",InventoryProductController.uploadImage);
    }
    public getDetailProductByCode(): void {
        this.router.get("/product/detailbycode/:code",InventoryProductController.getDetailByCode);
    }
    public getTopTen(): void {
        this.router.get("/product/topten",InventoryProductController.getTopTen);
    }
    public filterByBrand(): void {
        this.router.get("/product/filter/:brand",InventoryProductController.filterProductByBrand);
    }
    public editInventoryProduct(): void {
      this.router.patch("/product/:id", InventoryProductController.editInventoryProduct);
    }
    public deleteInventoryProduct(): void {
        this.router.delete("/product/:id", InventoryProductController.deleteInventoryProduct);
    }
    public getDetailInventoryProduct(): void {
        this.router.get("/product/:id/detail", InventoryProductController.getDetailInventoryProduct);
    }
}

export default new InventoryProductRoutes().router;
