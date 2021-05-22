import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

class UserController {
    static async getAllUser(req: Request, res: Response) {
        const allUser = await UserModel.find()
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Get All User Data",
            data: allUser
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
    static async getDetailUser(req: Request, res: Response) {
       try {
          const detailUser = await UserModel.findById(req.params.id)
          return res.status(200).json({
               success: true,
               statusCode: 200,
               responseStatus: "Status OK",
               message: "Get Detail User",
               data: detailUser
          });
       } catch (error) {
          return res.json({error: error})
       }
       
    }
}

export default UserController;
