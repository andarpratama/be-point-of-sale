"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
class UploadImage {
    static upload(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imageStorage = multer_1.default.diskStorage({
                    destination: (req, file, cb) => {
                        cb(null, 'public/img/products');
                    },
                    filename: (req, file, cb) => {
                        cb(null, file.originalname);
                    }
                });
                const imageFilter = (req, file, cb) => {
                    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                        return cb(new Error('You can only upload image!'), false);
                    }
                    cb(null, true);
                };
                return multer_1.default({ imageFilter, imageStorage });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UploadImage = UploadImage;
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
