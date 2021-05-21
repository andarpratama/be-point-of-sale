import { Router } from "express";
import OrderController from "../controllers/order.controller";

class OrderRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.getOrder();
        this.postOrder();
        this.editOrder();
        this.deleteOrder();
        this.getDetailOrder();
    }

    public getOrder(): void {
        this.router.get("/order", OrderController.getOrder);
    }
    public postOrder(): void {
        this.router.post("/order", OrderController.postOrder);
    }
    public editOrder(): void {
        this.router.patch("/order/:id", OrderController.editOrder);
    }
    public deleteOrder(): void {
        this.router.delete("/order/:id", OrderController.deleteOrder);
    }
    public getDetailOrder(): void {
        this.router.get("/order/:id/detail", OrderController.getDetailOrder);
    }
}

export default new OrderRoutes().router;
