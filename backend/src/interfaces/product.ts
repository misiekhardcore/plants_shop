import { Document, Model } from "mongoose";
import { IComment } from "./comment";

export type TLevels = "low" | "medium" | "high";

export interface IProduct {
  name: string;
  description: string;
  longDescription: string;
  price: number;
  countInStock: number;
  imgURLs: string[];
  discount: number;
  rating: number;
  comments: IComment[];
  light: TLevels;
  watering: TLevels;
  temperature: number;
}

export interface IProductUpdate extends IProduct {
  _id: string;
}

export interface IProductDocument extends IProduct, Document {}

export interface IProductModel extends Model<IProductDocument> {}
