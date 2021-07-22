import { Document, Model } from "mongoose";
import { IComment } from "./comment";

export type TLevels = "low" | "medium" | "high";
export type TSizes = "small" | "medium" | "big";

export interface IProduct {
  name: string;
  description: string;
  longDescription: string;
  price: number;
  countInStock: number;
  imgURLs: string[];
  discount: number;
  rating: number;
  isRated: boolean | null;
  comments: IComment[];
  size: TSizes;
  light: TLevels;
  watering: TLevels;
  temperature: number;
  sold: number;
  _doc:IProduct
}

export interface IProductUpdate extends IProduct {
  _id: string;
}

export interface IProductDocument extends IProduct, Document {}

export interface IProductModel extends Model<IProductDocument> {}
