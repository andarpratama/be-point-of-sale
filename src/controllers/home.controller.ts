import { Request, Response } from "express";
import logging from "../config/logging";

class HomeController {
    static homePage(req: Request, res: Response) {
        logging.info(
            "HOME",
            `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
        );
        res.status(200).json({
            success: true,
            statusCode: 200,
            responseStatus: "Status OK",
            message: "Welcome, this is API Pak Acong Store..",
        });
    }
}

export default HomeController;
