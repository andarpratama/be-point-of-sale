import { Router } from 'express'
import authController from '../controllers/auth.controller'

class AuthRoute {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.register()
      this.login()
   }

   public home(): void {
      this.router.get('/', authController.home)
   }

   public register(): void {
      this.router.post('/signup', authController.signup)
   }

   public login(): void {
      this.router.post('/signin', authController.signin);
   }

   

}

export default new AuthRoute().router