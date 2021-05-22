import { UserModel } from '../models/user.model'
import {Request, Response, ErrorRequestHandler, NextFunction} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import logging from '../config/logging'
import validator from 'validator'
import nodemailer from 'nodemailer'

class Auth {
   constructor() {
      dotenv.config()
   }

   static home(req: Request, res: Response, err: ErrorRequestHandler) {
      res.status(200).json({ message: 'Auth / Home'})
   }

   static async forgotPassword(req: Request, res: Response, next: NextFunction) {
      const { email } = req.body
   
      try {
         const foundUser = await UserModel.findOne({ email })
         const idUser = foundUser?._id
         const tokenForgotPassword = jwt.sign({ _id: idUser }, "Assignment4", {
            expiresIn: "5m",
         });

         const apiResetPassword = 'http://localhost:3030/api/v1/auth/reset-password/';

         let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
               user: 'andar.salt@gmail.com',
               pass: 'prathama354'
            }
         })

         let mailOptions = {
            from: 'andar.salt@gmail.com',
            to: 'master.amarta@gmail.com',
            subject: 'Reset Password',
            text: 'Link Reset Password',
            html: `Hai ${foundUser?.name}, silahkan klik link berikut : <br>
                     <a href="${apiResetPassword}${tokenForgotPassword}" >Reset Password</a>
                     <br>
                   Link ini akan aktif selama, 30 menit. Setalah itu link akan nonaktif
                  `
         }

         transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
               res.json({
                  error: err
               })
            } else {
               res.status(200).json({
                  success: true,
                  statusCode: 200,
                  responseStatus: "Status OK",
                  message: "Forgot password", 
                  data: foundUser?._id,
                  token: tokenForgotPassword,
                  info: info.response
               });
            }
         })
   
      } catch (error) {
         next(error)
      }
      
   }

   static async resetPassword(req: Request, res: Response, next: NextFunction) {
      const tokenResetPassword = req.params.token
      try {
         if (!tokenResetPassword) {
            throw { name: 'Missing Token Reset Password' };
         }
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Berhasil reset password", 
         });
      } catch (error) {
         next(error)
      }
   }

   static async signup(req: Request, res: Response, next: NextFunction) {
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
                password: await bcrypt.hash(req.body.password, 8)
            });
            await newUser.save();
            res.status(201).json({
                success: true,
                message: 'Success Registration',
                status: 'Created',
                statusCode: 201,
                data: newUser
            });
            logging.info('SIGNUP', 'MESSAGE: Success Sigup')
        } catch (err) {
            next(err);
        }
    }


   static async signin(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.body.email) {
                throw { name: 'Email is Required' };
            }
            
            if (!validator.isEmail(req.body.email)) {
                  throw { name: 'Invalid Email' };
            }
           
            if (!req.body.password) {
                throw { name: 'Password is Required' };
            }
            const loginUser:any = {
                username: req.body.username,
                email: req.body.email
            };
            for (const key in loginUser) {
                if (!loginUser[key]) {
                    delete loginUser[key];
                }
            }
            const foundUser = await UserModel.findOne(loginUser);
            // When user not found
            if (!foundUser) {
                throw { name: 'Email not Registered' };
            }
            const isPasswordValid = await bcrypt.compare(
                req.body.password,
                foundUser.password
            );
            // When User password is wrong
            if (!isPasswordValid) {
                throw { name: 'Invalid Password' };
            }
            const secretKey: string = (process.env.SECRET_KEY as string)
         
            let token:any = jwt.sign({ id: foundUser.id }, secretKey);
            res.status(200).json({
                success: true,
                message: 'Login Success',
                data: {
                    User: foundUser._id,
                    Authorization: `Bearer ${token}`,
                    expiresIn: 3600,
                },
                status: 'OK',
                statusCode: 200
            });
            logging.info('SIGNIN', 'MESSAGE: Success Signin')
        } catch (err) {
            next(err);
        }
    }
   
}

export default Auth