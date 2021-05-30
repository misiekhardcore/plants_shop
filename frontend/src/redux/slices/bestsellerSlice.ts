import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_URI } from "../../config";
import { IGetProductsReq, IProduct } from "../../types/types";
import { RootState } from "../store";

export interface BestsellerState {
  products: IProduct[];
  loading: boolean;
  error: SerializedError | undefined;
}

const initialState: BestsellerState = {
  products: [],
  loading: false,
  error: undefined,
};

export const getBestsellerProducts = createAsyncThunk<
  IProduct[],
  IGetProductsReq,
  { rejectValue: SerializedError }
>(
  "products/getBestsellerProducts",
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
      const response = await axios.post<{
        products: IProduct[];
        isNext: boolean;
      }>(`${API_URI}products`, {
        limit,
        offset,
        sortBy,
        search,
      });
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bestsellerSlice = createSlice({
  name: "bestsellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBestsellerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBestsellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = undefined;
      })
      .addCase(getBestsellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectBestsellers = (state: RootState) =>
  state.bestsellers;

export default bestsellerSlice.reducer;
