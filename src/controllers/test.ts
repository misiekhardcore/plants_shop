import { NextFunction, Request, Response } from "express";

export const ping = (_: Request, res: Response, __: NextFunction) => {
  return res.status(200).json({
    message: "pong",
  });
};
