import { NextFunction, Request, Response } from "express";
import { CustomReqBody, Error } from "src/interfaces/common";
import { IProduct, IProductUpdate } from "../interfaces/product";
import { Product } from "../models/product.model";
import loggings from "../utils/loggers";

const NAMESPACE = "products";

export const getAllProducts = async (
  _: Request,
  res: Response<IProduct[] | Error>
): Promise<void> => {
  try {
    const products = await Product.find({});
    loggings.info(NAMESPACE, "get all products");
    res.status(200).json(products);
  } catch (error) {
    loggings.error(NAMESPACE, error.message);
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
    loggings.info(NAMESPACE, "get one product");
    res.status(200).json(product);
  } catch (error) {
    loggings.error(NAMESPACE, error.message);
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
    loggings.info(NAMESPACE, "product created");
    res.status(201).json(product);
  } catch (error) {
    if (error.errors.description.kind === "required") {
      loggings.warn(NAMESPACE, "user input error");
      res.status(400).json({ message: "user input error", error });
      return;
    }
    loggings.error(NAMESPACE, error.message);
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
    loggings.info(NAMESPACE, "product updated");
    res.status(200).json(product);
  } catch (error) {
    if (error.errors.description.kind === "required") {
      loggings.warn(NAMESPACE, "user input error");
      res.status(400).json({ message: "user input error", error });
      return;
    }
    loggings.error(NAMESPACE, error.message);
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
    loggings.info(NAMESPACE, "product deleted");
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
