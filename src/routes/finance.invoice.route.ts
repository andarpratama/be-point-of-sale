import { Router } from "express";
import FinanceInvoiceController from "../controllers/finance.invoice.controller";

class FinanceInvoiceRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.getFinanceInvoice();
        this.postFinanceInvoice();
        this.editFinanceInvoice();
        this.deleteFinanceInvoice();
        this.getDetailFinanceInvoice();
    }

    public getFinanceInvoice(): void {
        this.router.get("/invoice", FinanceInvoiceController.getFinanceInvoice);
    }
    public postFinanceInvoice(): void {
        this.router.post(
            "/invoice",
            FinanceInvoiceController.postFinanceInvoice
        );
    }
    public editFinanceInvoice(): void {
        this.router.patch(
            "/invoice/:id",
            FinanceInvoiceController.editFinanceInvoice
        );
    }
    public deleteFinanceInvoice(): void {
        this.router.delete(
            "/invoice/:id",
            FinanceInvoiceController.deleteFinanceInvoice
        );
    }
    public getDetailFinanceInvoice(): void {
        this.router.get(
            "/invoice/:id/detail",
            FinanceInvoiceController.getDetailFinanceInvoice
        );
    }
}

export default new FinanceInvoiceRoutes().router;
