import { Router, Request, Response } from "express";
import ErrorHandler from "../middlewares/errorHandler";

import authRoute from "./auth.route";
import userRoute from "../routes/user.route";
import inventoryBrandRoute from "../routes/inventory.brand.route";
import inventoryUnitRoute from "../routes/inventory.unit.route";
import inventoryProductRoute from "../routes/inventory.product.route";
import inventorySupplierRoute from "./inventory.supplier.route";
import financePoRoute from "./finance.po.route";
import orderRoute from "./order.route";
import homeRoute from "./home.route";
import financeInvoiceRoute from "./finance.invoice.route"
import companyRoute from "./company.route";


class Routes {
    router: Router;
    constructor() {
        this.router = Router();
        this.home();
        this.auth();
        this.user();
        this.inventoryBrand();
        this.inventoryUnit();
        this.inventoryProduct();
        this.inventorySupplier();
        this.financePo();
        this.order();
        this.errorHandler();
        this.finanaceInvoice()
        this.company()
    }
    //====================HOME ENDPOINT====================
    public home() {
        this.router.get("/", homeRoute);
    }
    //====================END OF HOME ENDPOINT=============

    //====================AUTH ENDPOINT====================
    public auth(): void {
        this.router.use("/api/v1/auth", authRoute);
    }
    //====================END OF AUTH ENDPOINT=============

    //====================USER ENDPOINT====================
    public user(): void {
        this.router.use("/api/v1/user", userRoute);
    }
    //====================END OF USER ENDPOINT=============

    //====================INVENTORY ENDPOINT===============
    public inventoryBrand(): void {
        this.router.use("/api/v1/inventory", inventoryBrandRoute);
    }
    public inventoryUnit(): void {
        this.router.use("/api/v1/inventory", inventoryUnitRoute);
    }
    public inventoryProduct(): void {
        this.router.use("/api/v1/inventory", inventoryProductRoute);
    }
    public inventorySupplier(): void {
        this.router.use("/api/v1/inventory", inventorySupplierRoute);
    }
    //====================END OF INVENTORY ENDPOINT=========

    //====================FINANCE ENDPOINT==================
    public financePo(): void {
        this.router.use("/api/v1/finance", financePoRoute);
    }
    public finanaceInvoice():void {
       this.router.use("/api/v1/finance", financeInvoiceRoute)
    }
    //====================END OF FINANCE ENDPOINT===========

    //====================ORDER ENDPOINT====================
    public order(): void {
        this.router.use("/api/v1/order", orderRoute);
    }
    //====================END OF ORDER ENDPOINT=============
   
    
    public company():void {
       this.router.use('/api/v1/company', companyRoute)
    }
   

    //====================ERROR HANDLER=====================
    public errorHandler(): void {
        this.router.use(ErrorHandler.handleErrors);
    }
    //====================END OF ERROR HANDLER==============
}

export default new Routes().router;
