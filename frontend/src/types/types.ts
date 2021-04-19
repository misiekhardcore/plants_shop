export interface IProductInput {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  imgURLs: string[];
}

export interface IProduct extends IProductInput {
  _id: string;
}

export interface ICartProduct extends IProduct {
  amount: number;
}

export interface Error {
  message: string;
  error?: any;
}

export type ActionStatus = "idle" | "loading" | "failed";

export const SortBy = {
  NONE: {},
  PA: { price: "asc" },
  PD: { price: "desc" },
  NA: { name: "asc" },
  ND: { name: "desc" },
};

export type sortByEnum = keyof typeof SortBy;