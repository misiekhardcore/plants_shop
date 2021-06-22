import { NextFunction, Request, Response } from "express";
import {
  CustomReqBody,
  Error,
  IGetProductsReq,
} from "src/interfaces/common";
import { CSortBy } from "../interfaces/common";
import {
  IProduct,
  // IProductDocument,
  IProductUpdate,
} from "../interfaces/product";
import { IRatingDocument } from "../interfaces/rating";
import { Product } from "../models/product.model";
import { Rating } from "../models/rating.model";

// const ratingsToNumber = async (product: IProductDocument) => {
//   const ratings = await Rating.find({ product: product._id });
//   return (
//     ratings.reduce((a: number, c: IRatingDocument) => a + c.rating, 0) /
//     ratings.length
//   );
// };

// TODO: map objects to get rating and isRated
export const getAllProducts = async (
  req: CustomReqBody<IGetProductsReq>,
  res: Response<
    | { products: IProduct[]; isNext: boolean; totalCount: number }
    | Error
  >
): Promise<void> => {
  try {
    const totalCount = await Product.find().countDocuments((_, c) => c);
    const {
      limit = 10,
      offset = 0,
      sortBy = "NONE",
      search = {},
    } = req.body;
    const products = await Product.find(search)
      .sort(CSortBy[sortBy])
      .limit(limit + 1)
      .skip(offset);

    res.status(200).json({
      products: products.slice(0, limit),
      isNext: products.length > limit,
      totalCount,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

export const getOneProduct = async (
  req: Request<{ id: string }>,
  res: Response<IProduct | Error>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return next();

    let rating = 0;
    const ratings = await Rating.find({ product: product.id });
    if (ratings)
      rating =
        ratings.reduce((a: number, c: IRatingDocument) => {
          return a + c.rating;
        }, 0) / ratings.length;

    const isRated = await Rating.findOne({ user: req.userId });
    res.status(200).json({
      ...product._doc,
      rating,
      isRated: isRated ? true : false,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

export const createProduct = async (
  req: CustomReqBody<IProduct>,
  res: Response<IProduct | Error>,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Product.create<IProduct>(req.body);
    if (!product) return next();
    res.status(201).json(product);
  } catch (error) {
    if (error.errors.description.kind === "required") {
      res.status(400).json({ message: "user input error", error });
      return;
    }
    res.status(500).json({ message: "server error", error });
  }
};

export const updateProduct = async (
  req: CustomReqBody<IProductUpdate>,
  res: Response<IProduct | Error>,
  next: NextFunction
): Promise<void> => {
  try {
    await Product.updateOne({ _id: req.body._id }, req.body);
    const product = await Product.findById(req.body._id);
    if (!product) return next();
    res.status(200).json(product);
  } catch (error) {
    if (error.errors.description.kind === "required") {
      res.status(400).json({ message: "user input error", error });
      return;
    }
    res.status(500).json({ message: "server error", error });
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response<Error>,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return next();

  try {
    await Product.deleteOne({ _id: id });
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
