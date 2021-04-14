import { NextFunction, Request, Response } from "express";
import loggers from "../utils/loggers";

const NAMESPACE = "test";

export const ping = (
  _: Request,
  res: Response,
  __: NextFunction
) => {
  loggers.info(NAMESPACE, "");

  return res.status(200).json({
    message: "pong",
  });
};
