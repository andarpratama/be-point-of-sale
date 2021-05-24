import { Router } from 'express'
import FinanceInvoiceController  from "../controllers/finance.invoice";

class FinanceRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.create()
   }

   public home(): void {
      this.router.get('/invoice', FinanceInvoiceController.getOne)
   }

   public create(): void {
      this.router.post('/invoice', FinanceInvoiceController.create)
   }

}

export default new FinanceRoute().router