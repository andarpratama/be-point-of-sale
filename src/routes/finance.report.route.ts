import { Router } from 'express'
import CompanyController from "../controllers/company.controller";
import FinanceReport from '../controllers/finance.report.controller';

class EstatementRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.getAll()
      this.getOne()
      this.create()
      this.update()
      this.delete()
   }

   public getAll(): void {
      this.router.get('/report', FinanceReport.getAll)
   }
   public getOne(): void {
      this.router.get('/report/:id', FinanceReport.getOne)
   }
   public create(): void {
      this.router.post('/report/', CompanyController.create)
   }
   public update(): void {
      this.router.patch('/report/:id', CompanyController.update)
   }
   public delete(): void {
      this.router.delete('/report/:id', CompanyController.delete)
   }

}

export default new EstatementRoute().router