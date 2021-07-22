import { Document, Model } from "mongoose";
import { IOrderItem } from "./orderItem";
import { IUser } from "./user";

export interface IOrder {
  user: IUser | string;
  products: IOrderItem[];
}

export interface IOrderDocument extends IOrder, Document {}

export interface IOrderModel extends Model<IOrderDocument> {}
