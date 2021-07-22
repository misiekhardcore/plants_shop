import { model } from "mongoose";
import { IProductDocument } from "src/interfaces/product";
import { ProductSchema } from "./product.schema";

export const Product = model<IProductDocument>("Product", ProductSchema);
