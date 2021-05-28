import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
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
   
   static async create(req: Request, res: Response, next: NextFunction) {
      try {
            if (!req.body.name) {
               throw { name: 'Name Required' };
            }
            if (!req.body.email) {
               throw { name: 'Email Required' };
            }
            if (!validator.isEmail(req.body.email)) {
               throw { name: 'Invalid Email' };
            }
            if (!req.body.password) {
                throw { name: 'Password Required' };
            }
            const newUser = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 8),
                handphone: req.body.handphone,
                role: req.body.role
            });
            await newUser.save();
            res.status(201).json({
                success: true,
                message: 'Success Registration',
                status: 'Created',
                statusCode: 201,
                data: newUser
            });
            // logging.info('SIGNUP', 'MESSAGE: Success Sigup')
        } catch (err) {
            next(err);
        }
   }
   
    static async editUser(req: Request, res: Response, next: NextFunction) {
         const userID = req.params.id;
         const updateData: any = {
            name: req.body.name,
            email: req.body.email,
            handphone: req.body.handphone,
            role: req.body.role,
            status: true
         };

         for (const key in updateData) {
            if (!updateData[key]) {
               delete updateData[key];
            }
         }
       
         const updatedUser = await UserModel.findByIdAndUpdate(
                userID,
                updateData,
                { new: true }
         );
       
         try {
            res.status(200).json({
               success: true,
               statusCode: 200,
               responseStatus: "Status OK",
               message: "Success update user",
               userID: userID,
               updatedUser: updatedUser
            });
         } catch (error) {
            next(error)
         }
         
    }
    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        const userID = req.params.id
        try {
           const deletedUser = await UserModel.findByIdAndUpdate(userID, {status: false}, {new:true})
           res.status(200).json({
               success: true,
               statusCode: 200,
               responseStatus: "Status OK",
               message: "Success delete user",
           });
        } catch (error) {
            next(error)
        }
    }
   
    static async getDetailUser(req: Request, res: Response) {
       try {
          const detailUser = await UserModel.findById(req.params.id)
          res.status(200).json({
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
