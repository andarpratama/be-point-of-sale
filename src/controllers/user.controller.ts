import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

class UserController {
    static getAllUser(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get All User Data",
        });
    }
    static postBrand(req: Request, res: Response) {
        res.status(201).json({
            success: true,
            statusCode: 201,
            responseStatus: "Status OK",
            message: "Brand Created",
        });
    }
    static editUser(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Edit User",
        });
    }
    static deleteUser(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Delete User",
        });
    }
    static getDetailUser(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get Detail User",
        });
    }
}

export default UserController;
