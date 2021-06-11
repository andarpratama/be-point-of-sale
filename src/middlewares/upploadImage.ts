import { Response, NextFunction, Request } from 'express';
import multer from "multer";
import path from "path";

class UploadImage {
   static async upload(req: Request, res: Response, next: NextFunction) {
      try {
          const imageStorage = multer.diskStorage({
            destination: (req, file, cb) => {
               cb(null, 'public/img/products')
            },
            filename: (req, file, cb) => {
               cb(null, file.originalname)
            }
         })

         const imageFilter:any = (req:any, file:any, cb:any):any => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
               return cb(new Error('You can only upload image!'), false)
            }
            cb(null, true)
         }
         return multer(<any>{imageFilter, imageStorage})
      } catch (error) {
         next(error)
      }
     
   }
}

export { UploadImage };



// static uploadImage(req: Request, res: Response, next: NextFunction) {
//       try {
//          upload(req, res, (error:any) => {
//             if (error) {
//                throw { name: "Failed Upload Image" };
//             } else {
//                const hostname = req.headers.host;
//                const pathname = '/public/img/'
//                console.log('http://' + hostname + pathname + imageName);
//                 res.status(201).json({
//                   success: true,
//                   statusCode: 201,
//                   responseStatus: "Status OK",
//                   message: `Upload Image`,
//                });
//             }
//          })
//       } catch (error) {
//          next(error)
//       }
//    }