import { Router } from "express";
import HomeController from "../controllers/home.controller";

class HomeRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.homePage();
    }

    public homePage(): void {
        this.router.get("/", HomeController.homePage);
    }
}

export default new HomeRoutes().router;
