import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authJwt } from "../middlewares/auth.jwt";

class UserRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.getAllUser();
        this.authJwt();
        this.editUser();
        this.deleteUser();
        this.getDetailUser()
    }
   
    public authJwt():void {
       this.router.use(authJwt.authentication)
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
        this.router.get("/detail/:id", UserController.getDetailUser);
    }
}

export default new UserRoutes().router;
