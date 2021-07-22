import { Document, Model } from "mongoose";
import { IProduct } from "./product";

export interface IOrderItem {
  product: IProduct;
  amount: number;
}

export interface IOrderItemDocument extends IOrderItem, Document {}

export interface IOrderItemModel extends Model<IOrderItemDocument> {}
