import { Request } from "express";

export interface CustomReqBody<T> extends Request {
  body: T;
}

export interface Error {
  message: string;
  error?: any;
}

export const CSortBy = {
  NONE: {},
  PA: { price: "asc" },
  PD: { price: "desc" },
  NA: { name: "asc" },
  ND: { name: "desc" },
  SA: { sold: "asc" },
  SD: { sold: "desc" },
  RA: { rating: "asc" },
  RD: { rating: "desc" },
};

export type sortByEnum = keyof typeof CSortBy;

export interface IGetProductsReq {
  sortBy?: sortByEnum;
  limit?: number;
  offset?: number;
  search?: any;
}
