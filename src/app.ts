import express, { Application, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import path from 'path'

class App {
   public app: Application
   private envPath = path.join(__dirname, '../env/dev.env');
   constructor() { 
      this.app = express()
      this.plugin()
      this.router()
   }

   protected plugin(): void{
      dotenv.config({path: this.envPath})
      this.app.use(cors());
      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: true }))
   }

   public router(): void {
      this.app.get('/', (req: Request, res: Response, next: NextFunction) => {
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Welcome, this is API Pak Acong Store.."
         })
      })
   }
}

const APP = new App().app;
const PORT = process.env.SERVER_PORT

export  { APP, PORT }