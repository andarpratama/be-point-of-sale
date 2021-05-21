import mongoose from 'mongoose'
import logging from './logging'
import dotenv from "dotenv";
import path from 'path'

class mongooDB {
   public envPath = path.join(__dirname, '../../env/dev.env');
   constructor() {
      dotenv.config({ path: this.envPath })
      console.log(process.env.DB_HOST)
   }
   
   public connectDB(): void {
      const pathURL:string = process.env.DB_HOST as string
      const connectOption = {
         useCreateIndex: true,
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,  
      }
      mongoose.connect(pathURL, connectOption)

      const db = mongoose.connection
      db.on('error', ()=> logging.error('DATABASE', 'MESSAGE: Connection error..'))
      db.once('open', () => {
         logging.info('DATABASE', 'MESSAGE: Database connected..')
      })
   }
}

export default new mongooDB().connectDB