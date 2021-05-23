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
      console.log(email)
   
      try {
         const foundUser = await UserModel.findOne({ email })
         if (!foundUser) {
            throw { name: 'Email not Registered' };
         }
         console.log(1)
         const idUser = foundUser?._id
         console.log(idUser)
         const tokenForgotPassword = jwt.sign({id: idUser}, "Assignment4", {
            expiresIn: "5m",
         });

         console.log(tokenForgotPassword)

         const apiResetPassword = 'http://localhost:3030/api/v1/auth/reset-password/';

         let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
               user: 'andar.salt@gmail.com',
               pass: 'prathama354'
            }
         })


         const buttonName = 'Reset Password'
         const buttonHref = `${apiResetPassword}${tokenForgotPassword}/${idUser}`
         const buttonReset = `<a href="${buttonHref}" style="padding: 13px 18px; border: none;border-radius: 5px; background-color: dodgerblue; color: white; font-size: 16px;text-decoration: none;font-family: sans-serif;" >${buttonName}</a>`

         const emailMessage = `
            <h1>Hai ${foundUser?.name}</h1>
            You are recieving this email because we recivied as password reset request for your account.
            <br>
            <div style="width: 100%; text-align: center; margin-top: 20px;" >
            ${buttonReset}
            </div>
            <br>

            This link will be active for 10 minutes, after that link password reset will be expired
            If you did not request a password request, no further action is required.
            <br> <br>

            Thankyou, <br>
            <b>Acong Store</b>
            <br> <br>

            <hr>
            If you are having trouble clicking the "Reset Password" button, copy and pase URL below into your web browser
            <br>
            ${buttonHref}
         `

         let mailOptions = {
            from: 'andar.salt@gmail.com',
            to: 'master.amarta@gmail.com',
            subject: 'Reset Password from ACONG STORE',
            text: 'Link Reset Password',
            html: emailMessage
         }

         console.log(3)

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

         console.log(4)
   
      } catch (error) {
         next(error)
      }
      
   }

   static async resetPassword(req: Request, res: Response, next: NextFunction) {
      const tokenResetPassword = req.params.token
      const userId = req.params.id
      console.log(userId)
      try {
         if (!tokenResetPassword) {
            throw { name: 'Missing Token Reset Password' };
         }
         
         const foundUser = await UserModel.findOne({_id: userId})
         if (!foundUser) {
            throw { name: 'ID not Registered' };
         }
         
         jwt.verify(tokenResetPassword, "Assignment4", function (error, decodedData) {
            if (error) {
               throw { name: 'Access Token Expired' };
            }
         })
         
         res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Berhasil reset password", 
         })
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