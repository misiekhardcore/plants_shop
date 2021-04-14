import { NextFunction, Request, Response } from "express";
import { IProduct } from "src/interfaces/product";
import { Product } from "../models/product.model";
import loggers from "../utils/loggers";

const NAMESPACE = "products";

export const getAllProducts = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find({});
    loggers.info(NAMESPACE, "get all products");
    res.status(200).json(products);
  } catch (error) {
    loggers.error(NAMESPACE, error.message);
    res.status(500).json({ message: "server error", error });
  }
};

export const getOneProduct = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return next();
    loggers.info(NAMESPACE, "get one product");
    res.status(200).json(product);
  } catch (error) {
    loggers.error(NAMESPACE, error.message);
  }
};

export const createProduct = async (
  req: Request<any, any, IProduct>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Product.create<IProduct>({ ...req.body });
    if (!product) return next();

    res.status(201).json(product);
  } catch (error) {
    if (error.errors.description.kind === "required") {
      loggers.warn(NAMESPACE, "user input error");
      res.status(400).json({ message: "user input error", error });
      return;
    }
    loggers.error(NAMESPACE, error.message);
    res.status(500).json({ message: "server error", error });
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
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
