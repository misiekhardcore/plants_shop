import { Request } from "express";

export interface CustomReqBody<T> extends Request {
  body: T;
}

export interface Error {
  message: string;
  error?: any;
}