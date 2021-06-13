import { Router } from 'express'
import FinanceInvoiceController  from "../controllers/finance.invoice";

class FinanceRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.getAll()
      this.getOne()
      this.create()
      this.paidInvoice()
   }

   public getAll(): void {
      this.router.get('/invoice', FinanceInvoiceController.getAll)
   }

   public getOne(): void {
      this.router.get('/invoice/:id', FinanceInvoiceController.getOne)
   }

   public create(): void {
      this.router.post('/invoice', FinanceInvoiceController.create)
   }

   public paidInvoice(): void {
      this.router.get('/invoice/paid/:id_invoice', FinanceInvoiceController.paidInvoice)
   }

}

export default new FinanceRoute().router