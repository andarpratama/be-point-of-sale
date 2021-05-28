import { Router } from 'express'
import PurchaseOrderController from '../controllers/purchase.order.controller';
import puchaseOrderController from "../controllers/purchase.order.controller";

class PurchaseOrderRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.create()
      this.getOne()
      this.addItem()
      this.deleteItem()
   }

   public home(): void {
      this.router.get('/', puchaseOrderController.home)
   }

   public getOne(): void {
      this.router.get('/:id', puchaseOrderController.getOne)
   }

   public create(): void {
      this.router.post('/', PurchaseOrderController.createPurchaseOrder)
   }

   public addItem(): void {
      this.router.post('/add-item/:id', PurchaseOrderController.addItem)
   }

   public deleteItem(): void {
      this.router.get('/delete-item/:id_po/:id_item', puchaseOrderController.deleteItem)
   }

}

export default new PurchaseOrderRoute().router