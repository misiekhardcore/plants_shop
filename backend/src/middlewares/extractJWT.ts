import { NextFunction, Request, Response } from "express";
import loggings from "../utils/loggers";
import jwt from "jsonwebtoken";
import config from "../config";

const NAMESPACE = "auth";

export const extractJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  loggings.info(NAMESPACE, "validating token");
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        loggings.error(NAMESPACE, "verification error");
        res.status(404).json({ message: error.message, error });
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "unauthorized" });
    return
  }
};
