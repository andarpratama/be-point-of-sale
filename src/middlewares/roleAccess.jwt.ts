import * as jwt from 'jsonwebtoken' 
import { Response, NextFunction, Request } from 'express';
import { UserModel } from '../models/user.model';
import { IDecodedToken } from "../interfaces/IDecoded";

class roleAccess {
    static async authentication(req: Request, _res: Response, next: NextFunction) {
        try {
            // When user doesn't input access token
            if (!req.header('RolAccess')) {
                throw { name: 'Missing Role Access' };
            }
            const decoded:any = jwt.verify( req.header('RolAccess')!.replace('Bearer ', ''), process.env.ROLE_KEY!, 
            ) as IDecodedToken;
            (<any>req).roleAcess = decoded.roleAcess;
            next();
        } catch (err) {
            return next(err);
        }
    }

   static async authorization(req: Request, _res: Response, next: NextFunction) {
        try {

            // Ambil req.roleAccess dari header
            // 

            const foundUser = await UserModel.findOne({ _id: (<any>req).roleAcess });
            // User not found, when do query using access token's ID from user model
            if (!foundUser) {
                throw { name: 'Access Token not Assosiated' };
            }
            if (String(foundUser._id) === req.params.userID) {
                next();
            } else {
                // When found user's ID not match with user's ID from params
                throw { name: 'Forbidden Access' };
            }
        } catch (err) {
            next(err);
        }
    }
}

export { roleAccess };
