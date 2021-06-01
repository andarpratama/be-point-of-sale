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
   
   public update(): void {
      this.router.patch('/:id_do', deliveryOrderController.update)
   }

   public delete(): void {
      this.router.delete('/:id_do', deliveryOrderController.delete)
   }

}

export default new DeliveryOrderRoute().router