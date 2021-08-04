import { Schema, Types } from "mongoose";
import { IOrderDocument } from "../interfaces/order";

export const OrderSchema = new Schema<IOrderDocument>(
  {
    user: { type: Types.ObjectId, ref: "User" },
    products: [{ type: Types.ObjectId, ref: "OrderItem" }],
    paid: { type: Boolean, default: false },
    paymentDate: { type: Date, default: null },
    delivered: { type: Boolean, default: false },
    deliveryDate: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);
