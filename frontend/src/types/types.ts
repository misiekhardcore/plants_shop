export type TLevels = "low" | "medium" | "high";

export interface ICommentInput {
  username: string;
  text: string;
}

export interface IComment extends ICommentInput {
  _id: string;
}

export interface IProductInput {
  name: string;
  description: string;
  longDescription: string;
  price: number;
  countInStock?: number;
  imgURLs: string[];
  discount?: number;
  rating?: number;
  comments?: IComment[];
  light: TLevels;
  watering: TLevels;
  temperature: number;
  saled?: number;
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
