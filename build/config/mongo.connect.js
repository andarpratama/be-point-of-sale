"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("./logging"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
class mongooDB {
    constructor() {
        this.envPath = path_1.default.join(__dirname, '../../env/dev.env');
        dotenv_1.default.config({ path: this.envPath });
    }
    connectDB() {
        const pathURL = process.env.DB_HOST;
        const connectOption = {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        };
        mongoose_1.default.connect(pathURL, connectOption);
        const db = mongoose_1.default.connection;
        db.on('error', () => logging_1.default.error('DATABASE', 'MESSAGE: Connection error..'));
        db.once('open', () => {
            logging_1.default.info('DATABASE', 'MESSAGE: Database connected..');
        });
    }
}
exports.default = new mongooDB().connectDB;
