import { Router } from "express";
import OrderController from "../controllers/order.controller";

class OrderRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.getOrder();
        this.getOneOrder()
        this.postOrder();
        this.addItemOrder()
        this.getAll()
        this.getOneItem()
        this.deleteItemOrder()
        this.paidOrder()
        this.addTax()
        this.deleteTax()
        this.cancelOrder()
    }

    public getOrder(): void {
        this.router.get("/", OrderController.getOrder);
    }
    public getOneOrder(): void {
        this.router.get("/getone/:id_order", OrderController.getOneOrder);
    }
    public postOrder(): void {
        this.router.post("/", OrderController.createOrder);
    }
    public paidOrder(): void {
        this.router.post("/paid/:id_order", OrderController.paid);
    }
    public cancelOrder(): void {
        this.router.post("/cancel/:id_order", OrderController.cancelOrder);
    }
   
   
    /* ITEM --------------------------------------------- */
    
    public addTax(): void {
        this.router.get("/tax/:id_order", OrderController.addTax);
    }
    public deleteTax(): void {
        this.router.delete("/tax/:id_order", OrderController.deleteTax);
    }
    public addItemOrder(): void {
        this.router.post("/:id_order/add-item", OrderController.addItemOrder);
    }
    public getAll(): void {
        this.router.get("/item/getall", OrderController.getAllItem);
    }
    public getOneItem(): void {
        this.router.get("/item/:id_item", OrderController.getOneItem);
    }
    public deleteItemOrder(): void {
        this.router.delete("/delete-item/:id_order/:id_item", OrderController.deleteItem);
    }
}

export default new OrderRoutes().router;
