import { Response } from "express";
import { CustomReqBody, Error } from "../interfaces/common";
import { IProduct } from "../interfaces/product";
import { IRating } from "../interfaces/rating";
import { Rating } from "../models/rating.model";

export const createRating = async (
  req: CustomReqBody<IRating>,
  res: Response<IProduct | Error>
) => {
  const ratings = await Rating.create({
    user: req.userId,
    product: req.body.product,
  });
  console.log(ratings);
};
