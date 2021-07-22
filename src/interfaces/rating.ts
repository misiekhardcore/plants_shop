import { Document, Model } from "mongoose";

export interface IRating {
  user: string;
  product: string;
  rating: number;
}

export interface IRatingDocument extends IRating, Document {}

export interface IRartingModel extends Model<IRatingDocument> {}
