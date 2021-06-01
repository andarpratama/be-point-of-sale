import { Document } from "mongoose";

interface ICompany extends Document {
    name: string;
    address: string;
    logo: string;
    handphone: string;
    status: boolean;
}

export { ICompany };
