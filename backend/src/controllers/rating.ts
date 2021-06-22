import { NextFunction, Response } from "express";
import { CustomReqBody, Error } from "../interfaces/common";
import { IProduct } from "../interfaces/product";
import { IRating } from "../interfaces/rating";
import { Rating } from "../models/rating.model";
import { getOneProduct } from "./products";

export const createRating = async (
  req: CustomReqBody<IRating>,
  res: Response<IProduct | Error>,
  next: NextFunction
) => {
  try {
    await Rating.create({
      rating: req.body.rating,
      user: req.userId,
      product: req.body.product,
    });
    req.params.id = req.body.product;
    const product = await getOneProduct(req, res, next);
    if (!product)
      return res.status(500).json({ message: "server error" });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
