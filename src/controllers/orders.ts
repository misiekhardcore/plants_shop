import { NextFunction, Request, Response } from "express";
import { OrderItem } from "../models/orderItem.model";
import { CustomReqBody, Error } from "../interfaces/common";
import { IOrder, IOrderDocument } from "../interfaces/order";
import { IOrderItem } from "../interfaces/orderItem";
import { User } from "../models/user.model";
import { Order } from "../models/order.model";

export const createOrder = async (
  req: CustomReqBody<{ products: IOrderItem[] }>,
  res: Response<IOrderDocument | Error>
) => {
  try {
    const { products } = req.body;
    const user = await User.findById(req.userId);

    if (!products)
      return res.status(400).json({ message: "User input error" });

    let orderItems: IOrderItem[] = [];

    for (const product of products) {
      try {
        const orderItem = await OrderItem.create({
          product,
          quantity: product.amount,
        });

        orderItems.push(orderItem);
      } catch (error) {
        return res.status(500).json({ message: "Server error" });
      }
    }

    const order = await Order.create({
      user,
      products: orderItems,
    });

    return res.status(201).json(order);
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

    if (id.length != 12)
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

    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
