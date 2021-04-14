import { Document, Model } from "mongoose";
import { IProductDocument } from "./product";

export interface IUser {
  username: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IProductDocument> {}
