import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export interface IPayload {
  _id: string;
  token: string;
}

export const authUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(403).json({ message: "unauthorized" });
    const payload = jwt.verify(
      token,
      config.server.token.secret
    ) as IPayload;
    req.userId = payload._id;
    return next();
  } catch (error) {
    return res.status(400).json({ message: "invalid token" });
  }
};
