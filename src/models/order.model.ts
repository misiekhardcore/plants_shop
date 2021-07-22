import { model } from "mongoose";
import { IOrderDocument } from "../interfaces/order";
import { OrderSchema } from "./order.schema";

export const Order = model<IOrderDocument>("Order", OrderSchema);
