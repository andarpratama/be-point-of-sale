import { Router, Request, Response } from 'express'
import ErrorHandler from '../middlewares/errorHandler'
import logging from '../config/logging'
import authRoute from './auth.route'

class Routes {
   router: Router
   constructor() {
      this.router = Router()
      this.home()
      this.auth()
      this.errorHandler()
   }
   
   public home() {
      this.router.get('/', (req: Request, res: Response) => {
         logging.info('HOME', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Welcome, this is API Pak Acong Store.."
         })
      })
   }

   public auth(): void {
      this.router.use('/api/v1/auth', authRoute)
   }

   public errorHandler(): void {
      this.router.use(ErrorHandler.handleErrors)
   }

}

export default new Routes().router