import mongoose, { Schema } from "mongoose";

interface IUpload extends Document {
   name: string,
   image: string
}

interface UploadDocument extends mongoose.Document {
   name: string,
   image: string
}

interface UploadModelInterface extends mongoose.Model<UploadDocument> {
    build(attr: IUpload): UploadDocument;
}

const uploadSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const UploadModel = mongoose.model<UploadDocument, UploadModelInterface>(
    "Upload",
    uploadSchema
);
export { UploadModel, uploadSchema };
