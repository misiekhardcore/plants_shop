import { model } from "mongoose";
import { IRatingDocument } from "src/interfaces/rating";
import { RatingSchema } from "./rating.schema";

export const Rating = model<IRatingDocument>("Rating", RatingSchema);
