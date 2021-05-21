import { Router } from "express";
import InventoryUnitController from "../controllers/inventory.unit.controller";

class InventoryUnitRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.getInventoryUnit();
        this.postInventoryUnit();
        this.editInventoryUnit();
        this.deleteInventoryUnit();
    }

    public getInventoryUnit(): void {
        this.router.get("/unit", InventoryUnitController.getInventoryUnit);
    }
    public postInventoryUnit(): void {
        this.router.post("/unit", InventoryUnitController.postInventoryUnit);
    }
    public editInventoryUnit(): void {
        this.router.patch(
            "/unit/:id",
            InventoryUnitController.editInventoryUnit
        );
    }
    public deleteInventoryUnit(): void {
        this.router.delete(
            "/unit/:id",
            InventoryUnitController.deleteInventoryUnit
        );
    }
}

export default new InventoryUnitRoutes().router;
