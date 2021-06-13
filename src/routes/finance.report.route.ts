import { Router } from 'express'
import CompanyController from "../controllers/company.controller";

class EstatementRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.create()
      this.getone()
      this.update()
      this.delete()
   }

   public home(): void {
      this.router.get('/', CompanyController.getAll)
   }
   public create(): void {
      this.router.post('/', CompanyController.create)
   }
   public getone(): void {
      this.router.get('/detail', CompanyController.getOne)
   }
   public update(): void {
      this.router.patch('/:id', CompanyController.update)
   }
   public delete(): void {
      this.router.delete('/:id', CompanyController.delete)
   }

}

export default new EstatementRoute().router