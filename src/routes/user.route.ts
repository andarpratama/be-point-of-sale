import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authJwt } from "../middlewares/auth.jwt";
import ErrorHandler from "../middlewares/errorHandler";

class UserRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.getAllUser();
        this.create()
      //   this.authJwt();
        this.editUser();
        this.deleteUser();
        this.getDetailUser()
        this.errorHandler()
    }
   
    public authJwt():void {
       this.router.use(authJwt.authentication)
    }
   
   public create(): void {
       this.router.post('/', UserController.create)
    }

    public getAllUser(): void {
        this.router.get("/", UserController.getAllUser);
    }
    public editUser(): void {
        this.router.patch("/:id", UserController.editUser);
    }
    public deleteUser(): void {
        this.router.delete("/:id", UserController.deleteUser);
    }
    public getDetailUser(): void {
        this.router.get("/:id/detail", UserController.getDetailUser);
    }
   
   public errorHandler(): void {
        this.router.use(ErrorHandler.handleErrors);
    }
    
}

export default new UserRoutes().router;
