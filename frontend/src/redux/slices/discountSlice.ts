import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_URI } from "../../config";
import { IGetProductsReq, IProduct } from "../../types/types";
import { RootState } from "../store";

export interface DiscountState {
  products: IProduct[];
  loading: boolean;
  error: SerializedError | undefined;
}

const initialState: DiscountState = {
  products: [],
  loading: false,
  error: undefined,
};

export const getDiscountProducts = createAsyncThunk<
  IProduct[],
  IGetProductsReq,
  { rejectValue: SerializedError }
>(
  "products/getDiscountProducts",
  async (
    {
      limit = 4,
      offset = 0,
      sortBy = "NONE",
      search = { discount: { $gt: 0 } },
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post<IProduct[]>(`${API_URI}products`, {
        limit,
        offset,
        sortBy,
        search,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDiscountProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDiscountProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = undefined;
      })
      .addCase(getDiscountProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectDiscount = (state: RootState) => state.discount;

export default discountSlice.reducer;
