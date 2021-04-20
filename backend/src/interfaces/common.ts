import { Request } from "express";

export interface CustomReqBody<T> extends Request {
  body: T;
}

export interface Error {
  message: string;
  error?: any;
}

export const SortBy = {
  NONE: {},
  PA: { price: "asc" },
  PD: { price: "desc" },
  NA: { name: "asc" },
  ND: { name: "desc" },
};

export type sortByEnum = keyof typeof SortBy;

export interface IGetProductsReq {
  sortBy?: sortByEnum;
  limit?: number;
  offset?: number;
  search?: any;
}
