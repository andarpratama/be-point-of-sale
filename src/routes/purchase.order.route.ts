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
      this.getItem()
      this.getOneItem()
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

   public getItem(): void {
      this.router.get('/item/getall', PurchaseOrderController.getItem)
   }

   public getOneItem(): void {
      this.router.get('/item/:id_item', PurchaseOrderController.getOneItem)
   }

   public deleteItem(): void {
      this.router.delete('/delete-item/:id_po/:id_item', puchaseOrderController.deleteItem)
   }

}

export default new PurchaseOrderRoute().router