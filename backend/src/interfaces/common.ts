import { Request } from "express";

export interface CustomReqBody<T> extends Request {
  body: T;
}
