import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs'

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
    static async editUser(req: Request, res: Response, next: NextFunction) {
         const userId = req.params?.id
         const {name, email, handphone, image} = req.body
         let password = req.body.password
         password = await bcrypt.hash(req.body.password, 8)
         const updateData:any = {name, email, password, handphone, image}

       try {
            for (const item in updateData) {
               if (!updateData[item]) {
                  delete updateData[item]
               }
               if (updateData[item] === '') {
                  throw { name: 'All Input Required' };
               }
            }
            
            const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {new: true})
            if (updatedUser) {
               res.status(200).json({
                  success: true,
                  statusCode: 200,
                  responseStatus: "Status OK",
                  message: "Edit User",
                  data: updatedUser
               });
            }
            
         } catch (error) {
            next(error)
         }
         
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
