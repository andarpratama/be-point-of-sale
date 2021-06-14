import * as jwt from 'jsonwebtoken' 
import { Response, NextFunction, Request } from 'express';
import { UserModel } from '../models/user.model';
import { IDecodedToken } from "../interfaces/IDecoded";

class authJwt {
    static async authentication(
        req: Request,
        _res: Response,
        next: NextFunction
    ) {
        try {
            // When user doesn't input access token
            if (!req.header('Authorization')) {
                throw { name: 'Missing Access Token' };
            }
            const decoded:any = jwt.verify( req.header('Authorization')!.replace('Bearer ', ''), process.env.SECRET_KEY!, 
            ) as IDecodedToken;
            (<any>req).userId = decoded.id;
            next();
        } catch (err) {
            return next(err);
        }
    }

    static async authorization(
        req: Request,
        _res: Response,
        next: NextFunction
    ) {
        try {
            const foundUser = await UserModel.findOne({ _id: (<any>req).userId });
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

export { authJwt };
