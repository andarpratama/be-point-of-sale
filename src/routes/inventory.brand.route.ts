import { Router } from "express";
import InventoryBrandController from "../controllers/inventory.brand.controller";

class InventoryBrandRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.getInventoryBrand();
        this.postInventoryBrand();
        this.editInventoryBrand();
        this.deleteInventoryBrand();
    }

    public getInventoryBrand(): void {
        this.router.get("/brand", InventoryBrandController.getInventoryBrand);
    }
    public postInventoryBrand(): void {
        this.router.post("/brand", InventoryBrandController.postInventoryBrand);
    }
    public editInventoryBrand(): void {
        this.router.patch(
            "/brand/:id",
            InventoryBrandController.editInventoryBrand
        );
    }
    public deleteInventoryBrand(): void {
        this.router.delete(
            "/brand/:id",
            InventoryBrandController.deleteInventoryBrand
        );
    }
}

export default new InventoryBrandRoutes().router;
