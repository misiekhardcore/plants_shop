import { Document, Model } from "mongoose";
import { MongoResult } from "./common";

export interface IUser extends MongoResult {
  username: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}
