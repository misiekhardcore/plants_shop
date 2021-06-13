import { Document, Model } from "mongoose";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface IRating {
  user: IUser;
  product: IProduct;
  rating: number;
}

export interface IRatingDocument extends IRating, Document {}

export interface IRartingModel extends Model<IRatingDocument> {}
