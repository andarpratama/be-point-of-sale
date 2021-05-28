// import { Router } from "express";
// import FinancePoController from "../controllers/finance.po.controller";

// class FinancePoRoutes {
//     router: Router;
//     constructor() {
//         this.router = Router();
//         this.getFinancePo();
//         this.postFinancePo();
//         this.editFinancePo();
//         this.deleteFinancePo();
//         this.getDetailFinancePo();
//     }

//     public getFinancePo(): void {
//         this.router.get("/purchase", FinancePoController.getFinancePo);
//     }
//     public postFinancePo(): void {
//         this.router.post("/purchase", FinancePoController.postFinancePo);
//     }
//     public editFinancePo(): void {
//         this.router.patch("/purchase/:id", FinancePoController.editFinancePo);
//     }
//     public deleteFinancePo(): void {
//         this.router.delete(
//             "/purchase/:id",
//             FinancePoController.deleteFinancePo
//         );
//     }
//     public getDetailFinancePo(): void {
//         this.router.get(
//             "/purchase/:id/detail",
//             FinancePoController.getDetailFinancePo
//         );
//     }
// }

// export default new FinancePoRoutes().router;
