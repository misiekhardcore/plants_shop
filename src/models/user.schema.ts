import { Schema } from "mongoose";
import { IUserDocument } from "src/interfaces/user";

export const UserSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
