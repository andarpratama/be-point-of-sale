"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("../routes/user.route"));
const inventory_brand_route_1 = __importDefault(require("../routes/inventory.brand.route"));
const inventory_unit_route_1 = __importDefault(require("../routes/inventory.unit.route"));
const inventory_product_route_1 = __importDefault(require("../routes/inventory.product.route"));
const inventory_supplier_route_1 = __importDefault(require("./inventory.supplier.route"));
const order_route_1 = __importDefault(require("./order.route"));
const home_route_1 = __importDefault(require("./home.route"));
const finance_invoice_route_1 = __importDefault(require("./finance.invoice.route"));
const company_route_1 = __importDefault(require("./company.route"));
const purchase_order_route_1 = __importDefault(require("./purchase.order.route"));
const delivery_order_route_1 = __importDefault(require("./delivery.order.route"));
const auth_jwt_1 = require("../middlewares/auth.jwt");
const finance_report_route_1 = __importDefault(require("./finance.report.route"));
class Routes {
    constructor() {
        this.router = express_1.Router();
        this.home();
        this.auth();
        this.authentication();
        this.user();
        this.inventoryBrand();
        this.inventoryUnit();
        this.inventoryProduct();
        this.inventorySupplier();
        this.purchaseOrder();
        this.deliveryOrder();
        this.order();
        this.errorHandler();
        this.finanaceInvoice();
        this.financeReport();
        this.company();
    }
    /* HOME ----------------------------------------------- */
    home() {
        this.router.get("/", home_route_1.default);
    }
    /* AUTH ----------------------------------------------- */
    authentication() {
        this.router.use(auth_jwt_1.authJwt.authentication);
    }
    /* AUTH ----------------------------------------------- */
    auth() {
        this.router.use("/api/v1/auth", auth_route_1.default);
    }
    /* USER ----------------------------------------------- */
    user() {
        this.router.use("/api/v1/user", user_route_1.default);
    }
    /* INVENTORY ------------------------------------------ */
    inventoryBrand() {
        this.router.use("/api/v1/inventory", inventory_brand_route_1.default);
    }
    inventoryUnit() {
        this.router.use("/api/v1/inventory", inventory_unit_route_1.default);
    }
    inventoryProduct() {
        this.router.use("/api/v1/inventory", inventory_product_route_1.default);
    }
    inventorySupplier() {
        this.router.use("/api/v1/inventory", inventory_supplier_route_1.default);
    }
    /* PURCHASE ORDER ------------------------------------ */
    purchaseOrder() {
        this.router.use("/api/v1/purchase-order", purchase_order_route_1.default);
    }
    /* DELIVERY ORDER ------------------------------------ */
    deliveryOrder() {
        this.router.use("/api/v1/delivery-order", delivery_order_route_1.default);
    }
    /* FINANCE -------------------------------------------- */
    finanaceInvoice() {
        this.router.use("/api/v1/finance", finance_invoice_route_1.default);
    }
    financeReport() {
        this.router.use("/api/v1/finance", finance_report_route_1.default);
    }
    /* ORDER ----------------------------------------------- */
    order() {
        this.router.use("/api/v1/order", order_route_1.default);
    }
    /* COMPANY --------------------------------------------- */
    company() {
        this.router.use('/api/v1/company', company_route_1.default);
    }
    /* ERROR HANDLER ---------------------------------------- */
    errorHandler() {
        this.router.use(errorHandler_1.default.handleErrors);
    }
}
exports.default = new Routes().router;
