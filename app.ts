import express,  {Application } from 'express'

class App {
   public app: Application
   constructor() { 
      this.app = express()
      this.plugin()
   }

   protected plugin(): void{
      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: true }))
   }
}

export default App