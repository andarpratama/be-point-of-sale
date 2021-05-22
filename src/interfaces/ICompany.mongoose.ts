import mongoose from "mongoose";

interface CompanyDocument extends mongoose.Document {
    name: string;
    address: string;
    logo: string;
    handphone: string;
}

export { CompanyDocument };
