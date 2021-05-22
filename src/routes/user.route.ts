import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.getAllUser();
        this.postBrand();
        this.editUser();
        this.deleteUser();
    }

    public getAllUser(): void {
        this.router.get("/", UserController.getAllUser);
    }
    public postBrand(): void {
        this.router.post("/brand", UserController.postBrand);
    }
    public editUser(): void {
        this.router.patch("/:id", UserController.editUser);
    }
    public deleteUser(): void {
        this.router.delete("/:id", UserController.deleteUser);
    }
    public getDetailUser(): void {
        this.router.get("/:id", UserController.getDetailUser);
    }
}

export default new UserRoutes().router;
