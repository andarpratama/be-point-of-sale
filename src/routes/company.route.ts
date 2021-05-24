import { Router } from 'express'
import CompanyController from "../controllers/company.controller";

class CompanyRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.create()
   }

   public home(): void {
      this.router.get('/', CompanyController.getOne)
   }

   public create(): void {
      this.router.post('/', CompanyController.create)
   }

}

export default new CompanyRoute().router