import { NextFunction, Request, Response } from "express";
import { CustomReqBody, Error } from "src/interfaces/common";
import { IProduct, IProductUpdate } from "../interfaces/product";
import { Product } from "../models/product.model";

const SortBy = {
  NONE: {},
  PA: { price: "asc" },
  PD: { price: "desc" },
  NA: { name: "asc" },
  ND: { name: "desc" },
};

type sortByEnum = keyof typeof SortBy;

export const getAllProducts = async (
  req: Request,
  res: Response<IProduct[] | Error>
): Promise<void> => {
  try {
    const limit: number = +(req.query.limit || 20);
    const offset: number = +(req.query.offset || 0);
    const sortBy: sortByEnum = (req.query.sortBy as sortByEnum) || "NONE";

    const products = await Product.find({})
      .sort(SortBy[sortBy])
      .limit(+limit)
      .skip(+offset);
    res.status(200).json(products);
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
    res.status(200).json(product);
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
