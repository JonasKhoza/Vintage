import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
}

const userSchema = new Schema<UserInterface>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<UserInterface>("User", userSchema);

export default User;
