import { Document, Model } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  imgURLs: string[];
}

export interface IProductUpdate extends IProduct {
  _id: string;
}

export interface IProductDocument extends IProduct, Document {}

export interface IProductModel extends Model<IProductDocument> {}
