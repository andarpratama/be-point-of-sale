import { Router } from "express";
import InventoryProductController from "../controllers/inventory.product.controller";

class InventoryProductRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.getInventoryProduct();
        this.postInventoryProduct();
        this.editInventoryProduct();
        this.deleteInventoryProduct();
        this.getDetailInventoryProduct();
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
   
   
   public pushUnitToProduct(): void {
      
   }
    public editInventoryProduct(): void {
        this.router.patch(
            "/product/:id",
            InventoryProductController.editInventoryProduct
        );
    }
    public deleteInventoryProduct(): void {
        this.router.delete(
            "/product/:id",
            InventoryProductController.deleteInventoryProduct
        );
    }
    public getDetailInventoryProduct(): void {
        this.router.get(
            "/product/:id/detail",
            InventoryProductController.getDetailInventoryProduct
        );
    }
}

export default new InventoryProductRoutes().router;
