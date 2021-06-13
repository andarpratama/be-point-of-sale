import { Router } from 'express'
import deliveryOrderController from '../controllers/delivery.order.controller'

class DeliveryOrderRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.getAll()
      this.create()
      this.getOne()
      this.update()
      this.delete()
      this.addItemDO()
      this.deleteItemDO()
      this.endDeliveryOrder()
   }

   public getAll(): void {
      this.router.get('/', deliveryOrderController.home)
   }

   public getOne(): void {
      this.router.get('/:id_do', deliveryOrderController.getOne)
   }

   public create(): void {
      this.router.post('/', deliveryOrderController.create)
   }

   public addItemDO(): void {
      this.router.post('/add-item/:id_do', deliveryOrderController.addItem)
   }

   public deleteItemDO(): void {
      this.router.delete('/delete-item/:id_item_do/:id_do/:id_item_po/:id_po', deliveryOrderController.deleteItem)
   }

   public endDeliveryOrder(): void {
      this.router.get('/end-do/:id_do', deliveryOrderController.endDeliveryOrder)
   }
   
   public update(): void {
      this.router.patch('/:id_do', deliveryOrderController.update)
   }

   public delete(): void {
      this.router.delete('/:id_do', deliveryOrderController.delete)
   }

}

export default new DeliveryOrderRoute().router