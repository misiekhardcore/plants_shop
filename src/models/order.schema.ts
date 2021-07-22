import { Schema, Types } from "mongoose";
import { IOrderDocument } from "../interfaces/order";

export const OrderSchema = new Schema<IOrderDocument>(
  {
    user: { type: Types.ObjectId, ref: "User" },
    products: [{ type: Types.ObjectId, ref: "OrderItem" }],
  },
  {
    timestamps: true,
  }
);
