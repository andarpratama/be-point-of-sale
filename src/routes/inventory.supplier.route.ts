import { Router } from "express";
import InventorySupplierController from "../controllers/inventory.supplier.controller";

class InventorySupplierRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.getInventorySupplier();
        this.postInventorySupplier();
        this.editInventorySupplier();
        this.deleteInventorySupplier();
        this.getDetailInventorySupplier();
    }

    public getInventorySupplier(): void {
        this.router.get(
            "/supplier",
            InventorySupplierController.getInventorySupplier
        );
    }
    public postInventorySupplier(): void {
        this.router.post(
            "/supplier",
            InventorySupplierController.postInventorySupplier
        );
    }
    public editInventorySupplier(): void {
        this.router.patch(
            "/supplier/:id",
            InventorySupplierController.editInventorySupplier
        );
    }
    public deleteInventorySupplier(): void {
        this.router.delete(
            "/supplier/:id",
            InventorySupplierController.deleteInventorySupplier
        );
    }
    public getDetailInventorySupplier(): void {
        this.router.get(
            "/supplier/:id/detail",
            InventorySupplierController.getDetailInventorySupplier
        );
    }
}

export default new InventorySupplierRoutes().router;
