import { Response, NextFunction, ErrorRequestHandler, Request } from "express";

class ErrorHandler {
    static handleErrors(
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        let statusCode;
        let message;
        let status;

        switch (err.name) {
            // -- Register
            case "Username or Email Required":
                statusCode = 422;
                message =
                    "Username or Email Required: Your username or email is required to perform this action";
                status = "Unprocessable Entity";
                break;

            case "Name Required":
                statusCode = 422;
                message =
                    "Name Required: Your name is required to perform this action";
                status = "Unprocessable Entity";
                break;

            case "Email Required":
                statusCode = 422;
                message =
                    "Email Required: Your email is required to perform this action";
                status = "Unprocessable Entity";
                break;

            // -- Login
            case "Email is Required":
                statusCode = 422;
                message =
                    "Email is Required: Your email is required to perform this action";
                status = "Unprocessable Entity";
                break;
            case "Password is Required":
                statusCode = 422;
                message =
                    "Password is Required: Your password is required to perform this action";
                status = "Unprocessable Entity";
                break;
            case "Invalid Email":
                statusCode = 422;
                message = "Invalid Email: Please input valid Email";
                status = "Unauthorized";
                break;
            case "Email not Registered":
                statusCode = 401;
                message = "Email not Registered: Your email is not registerd";
                status = "Unauthorized";
                break;
            case "Invalid Password":
                statusCode = 401;
                message = "Invalid Password: Your password is wrong";
                status = "Unauthorized";
                break;
            case "Failed Register":
                statusCode = 500;
                message = "Failed Register: Internal server error";
                status = "Internal server error";
                break;

            // -- Authentication
            case "Invalid Token":
                statusCode = 500;
                message = "Invalid Access Token: Please input correctly token";
                status = "Internal server error";
                break;
            case "Missing Access Token":
                statusCode = 401;
                message =
                    "Missing Access Token: Please input your access token";
                status = "Unauthorized";
                break;
            case "Access Token No Longer Registered":
                statusCode = 401;
                message =
                    "Access Token No Longer Registered: The access token is no longer registered, please register and re-login to get a new access token";
                status = "Unauthorized";
                break;

            // User controller
            case "All Input Required":
                statusCode = 422;
                message =
                    "All Input Required: Please input all input in this form";
                status = "Unprocessable Entity";
                break;

            case "JsonWebTokenError":
                statusCode = 401;
                message =
                    "JsonWebTokenError: Invalid access token, please check the validity of your access token";
                status = "Unauthorized";
                break;
            case "MongoError":
                statusCode = 422;
                message = `MongoError: Sorry this data has been used by another user, please enter a unique data`;
                status = "Unprocessable Entity";
                break;
            case "ValidationError":
                statusCode = 422;
                message =
                    "ValidationError: Make sure you have filled all the required fields with the valid data";
                status = "Unprocessable Entity";
                break;

            // COMMENT: Forgot and Reset Password
            case "Missing Token Reset Password":
                statusCode = 401;
                message =
                    "Missing Access Token Reset Password: Please back to input your email and get the new link";
                status = "Unauthorized";
                break;

            case "Params Is Empty":
                statusCode = 404;
                message =
                    "Params Is Empty: Please cek yout endpoint with params";
                status = "Not Found";
                break;

            case "Input body Required":
                statusCode = 404;
                message = "Input body Required: Please input data in body";
                status = "Not Found";
                break;
            case "Data Not Found":
                statusCode = 404;
                message = "Data Not Found";
                status = "Not Found";
                break;

            default:
                statusCode = 500;
                message = `Internal Server Error: Sorry, our server is in trouble`;
                status = "Internal Server Error";
                break;
        }

        res.status(statusCode).json({
            success: false,
            message: message,
            error: err,
            status: status,
            statusCode: statusCode,
        });
    }
}

export default ErrorHandler;
