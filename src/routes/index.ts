import { Router, Request, Response } from "express";
import ErrorHandler from "../middlewares/errorHandler";
import logging from "../config/logging";
import authRoute from "./auth.route";
import userRoute from "../routes/user.route";
import inventoryBrandRoute from "../routes/inventory.brand.route";
import inventoryUnitRoute from "../routes/inventory.unit.route";
import inventoryProductRoute from "../routes/inventory.product.route";
import inventorySupplierRoute from "./inventory.supplier.route";
import financePoRoute from "./finance.po.route";

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
        this.errorHandler();
    }

    public home() {
        this.router.get("/", (req: Request, res: Response) => {
            logging.info(
                "HOME",
                `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
            );
            res.status(200).json({
                success: true,
                statusCode: 200,
                responseStatus: "Status OK",
                message: "Welcome, this is API Pak Acong Store..",
            });
        });
    }

    public auth(): void {
        this.router.use("/api/v1/auth", authRoute);
    }
    //====================USER ENDPOINT====================
    public user(): void {
        this.router.use("/api/v1/user", userRoute);
    }
    //====================END OF USER ENDPOINT====================

    //====================INVENTORY ENDPOINT====================
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
    //====================END OF INVENTORY ENDPOINT====================

    //====================FINANCE ENDPOINT====================
    public financePo(): void {
        this.router.use("/api/v1/finance", financePoRoute);
    }
    //====================END OF FINANCE ENDPOINT====================
    public errorHandler(): void {
        this.router.use(ErrorHandler.handleErrors);
    }
}

export default new Routes().router;
