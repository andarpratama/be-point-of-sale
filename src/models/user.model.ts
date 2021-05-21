import mongoose, { Schema } from 'mongoose'
import { IUser } from "../interfaces/IUser";
import { UserDocument } from "../interfaces/IUser.mongoose";

interface UserModelInterface extends mongoose.Model<UserDocument> {
   build(attr: IUser): UserDocument
}

const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   image: {
      type: String,
   },
   roleId: {
      type: mongoose.Types.ObjectId, ref: 'Role'
   },
   status: {
      type: Boolean,
   },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const UserModel = mongoose.model<UserDocument, UserModelInterface>('User', userSchema)
export {UserModel}