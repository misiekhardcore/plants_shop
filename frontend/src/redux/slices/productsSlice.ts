import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ActionStatus,
  Error,
  IProduct,
  IProductInput,
} from "../../types/types";
import { RootState } from "../store";

export interface ProductsState {
  products: IProduct[];
  productDetails: IProduct;
  status: ActionStatus;
  error: any;
}

const initialState: ProductsState = {
  products: [],
  productDetails: {
    _id: "",
    countInStock: 0,
    description: "",
    imgURLs: [],
    name: "",
    price: 0,
  },
  status: "idle",
  error: {},
};

export const getAllProducts = createAsyncThunk<
  IProduct[],
  void,
  { rejectValue: Error }
>("products/getAllProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IProduct[]>(
      "http://localhost:4000/api/products"
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getOneProduct = createAsyncThunk<
  IProduct,
  { id: string },
  { state: RootState; rejectValue: Error }
>(
  "products/getOneProduct",
  async ({ id }, { getState, rejectWithValue }) => {
    const {
      products: { productDetails },
    } = getState();
    try {
      if (productDetails._id !== id) {
        const response = await axios.get<IProduct>(
          `http://localhost:4000/api/products/${id}`
        );
        return response.data;
      }
      return productDetails;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk<
  IProduct,
  { product: IProductInput },
  { rejectValue: Error }
>(
  "products/createProduct",
  async ({ product }, { rejectWithValue }) => {
    try {
      const response = await axios.post<IProduct>(
        "http://localhost:4000/api/products",
        product
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk<
  IProduct,
  { product: IProduct },
  { rejectValue: Error }
>(
  "products/updateProduct",
  async ({ product }, { rejectWithValue }) => {
    try {
      const response = await axios.put<IProduct>(
        "http://localhost:4000/api/products",
        product
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk<
  boolean,
  { id: string },
  { rejectValue: Error }
>("products/deleteProduct", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.delete<boolean>(
      `http://localhost:4000/api/products/${id}`
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
        state.error = {};
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getOneProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.status = "idle";
        state.productDetails = action.payload;
        state.error = {};
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
        state.error = {};
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = state.products.map((p) => {
          if (p._id === action.payload._id) {
            return action.payload;
          }
          return p;
        });
        state.error = {};
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = state.products.filter(
          (p) => p._id !== action.meta.arg.id
        );
      });
  },
});

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
