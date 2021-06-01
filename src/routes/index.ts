import { Router } from "express";
import ErrorHandler from "../middlewares/errorHandler";

import authRoute from "./auth.route";
import userRoute from "../routes/user.route";
import inventoryBrandRoute from "../routes/inventory.brand.route";
import inventoryUnitRoute from "../routes/inventory.unit.route";
import inventoryProductRoute from "../routes/inventory.product.route";
import inventorySupplierRoute from "./inventory.supplier.route";
import orderRoute from "./order.route";
import homeRoute from "./home.route";
import financeInvoiceRoute from "./finance.invoice.route"
import companyRoute from "./company.route";
import purchaseOrderRoute from "./purchase.order.route";
import deliveryOrderRoute from "./delivery.order.route";


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
        this.purchaseOrder()
        this.deliveryOrder()
        this.order();
        this.errorHandler();
        this.finanaceInvoice()
        this.company()
    }
   
   
    /* HOME ----------------------------------------------- */
    public home() {
        this.router.get("/", homeRoute);
    }
    
    /* AUTH ----------------------------------------------- */
    public auth(): void {
        this.router.use("/api/v1/auth", authRoute);
    }
    
    /* USER ----------------------------------------------- */
    public user(): void {
        this.router.use("/api/v1/user", userRoute);
    }
    
    /* INVENTORY ------------------------------------------ */
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
   
    /* PURCHASE ORDER ------------------------------------ */
    public purchaseOrder():void {
       this.router.use("/api/v1/purchase-order", purchaseOrderRoute)
    }
   
   /* DELIVERY ORDER ------------------------------------ */
    public deliveryOrder():void {
       this.router.use("/api/v1/delivery-order", deliveryOrderRoute)
    }

    /* FINANCE -------------------------------------------- */
    public finanaceInvoice():void {
       this.router.use("/api/v1/finance", financeInvoiceRoute)
    }
    
    /* ORDER ----------------------------------------------- */
    public order(): void {
        this.router.use("/api/v1/order", orderRoute);
    }
   
     /* COMPANY --------------------------------------------- */
    public company():void {
       this.router.use('/api/v1/company', companyRoute)
    }
   
     /* ERROR HANDLER ---------------------------------------- */
    public errorHandler(): void {
        this.router.use(ErrorHandler.handleErrors);
    }
}

export default new Routes().router;
