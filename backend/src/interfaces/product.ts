import { Document, Model } from "mongoose";
import { IComment } from "./comment";
import { IRating } from "./rating";

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
  rating: IRating[];
  comments: IComment[];
  size: TSizes;
  light: TLevels;
  watering: TLevels;
  temperature: number;
  sold: number;
}

export interface IProductUpdate extends IProduct {
  _id: string;
}

export interface IProductDocument extends IProduct, Document {}

export interface IProductModel extends Model<IProductDocument> {}
