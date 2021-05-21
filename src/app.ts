import express, { Application } from 'express'
import mongoConnect from './config/mongo.connect'
import Routes from './routes/index';
import dotenv from 'dotenv'
import cors from 'cors';
import path from 'path'

class App {
   public app: Application
   private envPath = path.join(__dirname, '../env/dev.env');
   constructor() {
      dotenv.config({path: this.envPath})
      this.app = express()
      this.plugin()
      this.router()
   }

   protected plugin(): void{
      this.app.use(cors());
      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: true }))
      mongoConnect()
   }

   public router(): void {
      this.app.use(Routes) 
   }
}

const APP = new App().app;
const PORT = process.env.SERVER_PORT

export  { APP, PORT }