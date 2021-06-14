import express, {Application, NextFunction, Request, Response} from 'express'
import mongoConnect from './config/mongo.connect'
import Routes from './routes/index';
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
      // dotenv.config({path: this.envPath})
      dotenv.config()
      this.app.use(cors());
      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: true }))
      // this.app.use("/public/img", express.static('public/img'));
      this.app.use("/public/img", express.static(path.join("public/img")));
      mongoConnect()

      this.app.use((req : Request, res: Response, next: NextFunction) => {
         res.setHeader("Access-Control-Allow-Origin", "*");
         res.setHeader("Access-Control-Expose-Headers", "Authorization")
         res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
         );
         res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, PUT, DELETE, OPTIONS"
         );
         next();
      });
   }

   public router(): void {
      this.app.use(Routes) 
   }
}

const APP = new App().app;
const PORT = process.env.PORT

export  { APP, PORT }