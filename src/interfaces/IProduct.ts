import { Document } from "mongoose";
import { IUnit } from "./IUnit";

interface IProduct extends Document {
    code: string;
    name: string;
    image: string;
    unitID: IUnit;
    status: boolean;
}

export { IProduct };
