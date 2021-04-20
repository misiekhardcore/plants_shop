import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_URI } from "../../config";
import { IProduct, IProductInput, sortByEnum } from "../../types/types";
import { RootState } from "../store";

export interface ProductsState {
  products: IProduct[];
  productDetails: IProduct;
  loading: boolean;
  error: SerializedError | undefined;
}

const initialState: ProductsState = {
  products: [],
  productDetails: {
    _id: "",
    name: "",
    description: "",
    longDescription: "",
    price: 0,
    discount: 0,
    countInStock: 0,
    rating: 5,
    saled: 0,
    imgURLs: [],
    comments: [],
    light: "medium",
    watering: "medium",
    temperature: 20,
  },
  loading: false,
  error: undefined,
};

export const getAllProducts = createAsyncThunk<
  IProduct[],
  { sortBy?: sortByEnum; limit?: number; offset?: number },
  { rejectValue: SerializedError }
>(
  "products/getAllProducts",
  async ({ limit = 0, offset = 0, sortBy = "NONE" }, { rejectWithValue }) => {
    try {
      const response = await axios.get<IProduct[]>(`${API_URI}products`, {
        params: { limit, offset, sortBy },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOneProduct = createAsyncThunk<
  IProduct,
  { id: string },
  { state: RootState; rejectValue: SerializedError }
>("products/getOneProduct", async ({ id }, { getState, rejectWithValue }) => {
  const {
    products: { productDetails },
  } = getState();
  try {
    if (productDetails._id !== id) {
      const response = await axios.get<IProduct>(`${API_URI}products/${id}`);
      return response.data;
    }
    return productDetails;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const createProduct = createAsyncThunk<
  IProduct,
  { product: IProductInput },
  { rejectValue: SerializedError }
>("products/createProduct", async ({ product }, { rejectWithValue }) => {
  try {
    const response = await axios.post<IProduct>(
      "http://localhost:4000/api/products",
      product
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateProduct = createAsyncThunk<
  IProduct,
  { product: IProduct },
  { rejectValue: SerializedError }
>("products/updateProduct", async ({ product }, { rejectWithValue }) => {
  try {
    const response = await axios.put<IProduct>(
      "http://localhost:4000/api/products",
      product
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteProduct = createAsyncThunk<
  boolean,
  { id: string },
  { rejectValue: SerializedError }
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
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = undefined;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOneProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
        state.error = undefined;
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.error = undefined;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((p) => {
          if (p._id === action.payload._id) {
            return action.payload;
          }
          return p;
        });
        state.error = undefined;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (p) => p._id !== action.meta.arg.id
        );
        state.error = undefined;
      });
  },
});

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
