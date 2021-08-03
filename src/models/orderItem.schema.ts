import { Schema, Types } from "mongoose";
import { IOrderDocument } from "../interfaces/order";

export const OrderItemSchema = new Schema<IOrderDocument>(
  {
    product: { type: Types.ObjectId, ref: "Product" },
    amount: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);
