export type TLevels = "low" | "medium" | "high";
export type TSizes = "small" | "medium" | "big";

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
  size: TSizes;
  light: TLevels;
  watering: TLevels;
  temperature: number;
  sold?: number;
}

export interface IProduct extends IProductInput {
  _id: string;
  countInStock: number;
  discount: number;
  rating: number;
  isRated: boolean | null;
  sold: number;
  comments: IComment[];
}

export interface ICartProduct extends IProduct {
  amount: number;
}

export interface IUser {
  username: string;
  email: string;
  password?: string;
}

export interface Error {
  message: string;
  error?: any;
}

export type ActionStatus = "idle" | "loading" | "failed";

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
