import { model } from "mongoose";
import { IOrderItemDocument } from "src/interfaces/orderItem";
import { OrderItemSchema } from "./orderItem.schema";

export const OrderItem = model<IOrderItemDocument>(
  "OrderItem",
  OrderItemSchema
);
