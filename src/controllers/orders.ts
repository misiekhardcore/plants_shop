import { NextFunction, Request, Response } from "express";
import { CustomReqBody, Error } from "../interfaces/common";
import { IOrder, IOrderDocument } from "../interfaces/order";
import { Order } from "../models/order.model";
import { OrderItem } from "../models/orderItem.model";
import { User } from "../models/user.model";

export const createOrder = async (
  req: CustomReqBody<{ products: [{ _id: string; amount: number }] }>,
  res: Response<boolean | Error>
) => {
  try {
    const { products } = req.body;
    const user = await User.findById(req.userId);

    if (!products)
      return res.status(400).json({ message: "User input error" });

    let orderItems: string[] = [];

    for (const product of products) {
      try {
        const { _id } = await OrderItem.create({
          product: product._id,
          amount: product.amount,
        });

        orderItems.push(_id);
      } catch (error) {
        return res.status(500).json({ message: "Server error" });
      }
    }

    await Order.create({
      user: user?._id,
      products: orderItems,
    });

    return res.status(201).json(true);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const getOrder = async (
  req: Request<{ id: string }>,
  res: Response<IOrder | Error>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (id.length != 24)
      return res.status(400).json({ message: "invalid id" });

    const order = await Order.findOne({
      _id: id,
      user: req.userId,
    }).populate([
      {
        path: "products",
        model: "OrderItem",
        populate: {
          path: "product",
          model: "Product",
        },
      },
      "user",
    ]);

    if (!order) return next();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const getOrders = async (
  req: Request & { userId: string },
  res: Response<IOrderDocument[] | Error>,
  next: NextFunction
) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate([
      {
        path: "products",
        model: "OrderItem",
        populate: {
          path: "product",
          model: "Product",
        },
      },
      "user",
    ]);

    if (!orders) return next();

    return res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
