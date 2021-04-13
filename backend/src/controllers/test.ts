import { NextFunction, Request, Response } from "express";
import loggers from "../utils/loggers";

const NAMESPACE = "test";

export const ping = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  loggers.info(NAMESPACE, "");

  return res.status(200).json({
    message: "pong",
  });
};
