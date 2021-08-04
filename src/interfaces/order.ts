import { Document, Model } from "mongoose";
import { IOrderItem } from "./orderItem";
import { IUser } from "./user";

export interface IOrder {
  user: IUser | string;
  products: IOrderItem[] | string[];
  paid: boolean;
  paymentDate: Date | null;
  delivered: boolean;
  deliveryDate: Date | null;
}

export interface IOrderDocument extends IOrder, Document {}

export interface IOrderModel extends Model<IOrderDocument> {}
