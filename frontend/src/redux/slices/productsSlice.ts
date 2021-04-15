import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ActionStatus,
  IProduct,
  IProductInput,
} from "../../types/types";
import { RootState } from "../store";

export interface ProductsState {
  products: IProduct[];
  productDetails: IProduct | undefined;
  status: ActionStatus;
  error: any;
}

const initialState: ProductsState = {
  products: [],
  productDetails: undefined,
  status: "idle",
  error: {},
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IProduct[]>(
        "http://localhost:4000/api/products"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOneProduct = createAsyncThunk(
  "products/getOneProduct",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get<IProduct>(
        `http://localhost:4000/api/products/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: IProductInput, { rejectWithValue }) => {
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

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: IProduct, { rejectWithValue }) => {
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

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete<{}>(
        `http://localhost:4000/api/products/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
