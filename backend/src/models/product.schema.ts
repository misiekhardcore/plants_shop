import { Schema } from "mongoose";
import { IProductDocument } from "src/interfaces/product";

export const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imgURLs: [{ type: String, required: true }],
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);