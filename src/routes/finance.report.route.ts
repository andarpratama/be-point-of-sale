import { Router } from 'express'
import FinanceReport from '../controllers/finance.report.controller';

class EstatementRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.getAll()
      this.getOne()
      this.getAllByDate()
      // this.create()
      // this.update()
      // this.delete()
   }

   public getAll(): void {
      this.router.get('/report', FinanceReport.getAll)
   }
   public getOne(): void {
      this.router.get('/report/:id', FinanceReport.getOne)
   }
   public getAllByDate(): void {
      this.router.post('/report/bydate', FinanceReport.getReportByDate)
   }

}

export default new EstatementRoute().router