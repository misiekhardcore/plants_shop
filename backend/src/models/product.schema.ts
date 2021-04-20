import { Schema } from "mongoose";
import { IProductDocument } from "src/interfaces/product";

export const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    imgURLs: [{ type: String, required: true }],
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 5 },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    light: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    watering: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    temperature: { type: Number, default: 20 },
    saled: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
