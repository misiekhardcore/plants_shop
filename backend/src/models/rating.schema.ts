import { Schema } from "mongoose";
import { IRatingDocument } from "src/interfaces/rating";

export const RatingSchema = new Schema<IRatingDocument>(
  {
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
