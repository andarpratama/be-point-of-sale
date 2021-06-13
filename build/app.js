"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.APP = void 0;
const express_1 = __importDefault(require("express"));
const mongo_connect_1 = __importDefault(require("./config/mongo.connect"));
const index_1 = __importDefault(require("./routes/index"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
class App {
    constructor() {
        this.envPath = path_1.default.join(__dirname, '../env/dev.env');
        this.app = express_1.default();
        this.plugin();
        this.router();
    }
    plugin() {
        // dotenv.config({path: this.envPath})
        dotenv_1.default.config();
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // this.app.use("/public/img", express.static('public/img'));
        this.app.use("/public/img", express_1.default.static(path_1.default.join("public/img")));
        mongo_connect_1.default();
    }
    router() {
        this.app.use(index_1.default);
    }
}
const APP = new App().app;
exports.APP = APP;
const PORT = process.env.PORT;
exports.PORT = PORT;
