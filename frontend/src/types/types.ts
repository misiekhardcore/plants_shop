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

export interface Error {
  message: string;
  error?: any;
}

export type ActionStatus = "idle" | "loading" | "failed";
