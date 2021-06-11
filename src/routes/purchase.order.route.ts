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
      this.addDiscount()
      this.deleteDiscount()
      this.endPurchaseOrder()
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

   public addDiscount(): void {
      this.router.post('/add-discount/:id_po', PurchaseOrderController.addDiscount)
   }

   public deleteDiscount(): void {
      this.router.delete('/del-discount/:id_po', PurchaseOrderController.deleteDiscount)
   }

   public endPurchaseOrder(): void {
      this.router.get('/end-po/:id_po', PurchaseOrderController.endPuchaseOrder)
   }

   public deleteItem(): void {
      this.router.delete('/delete-item/:id_po/:id_item', puchaseOrderController.deleteItem)
   }

}

export default new PurchaseOrderRoute().router