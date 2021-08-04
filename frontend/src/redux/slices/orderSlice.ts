import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_URI } from "../../config";
import { IOrder } from "../../types/types";
import { RootState } from "../store";

export interface OrderState {
  order: IOrder;
  orders: IOrder[];
  loading: boolean;
  error: SerializedError | undefined;
}

const initialState: OrderState = {
  order: {
    _id: "",
    products: [],
    user: {
      email: "",
      username: "",
      password: "",
    },
    createdAt: "",
    delivered: false,
    deliveryDate: null,
    paid: false,
    paymentDate: null,
  },
  orders: [],
  loading: false,
  error: undefined,
};

export const createOrder = createAsyncThunk<
  IOrder,
  any,
  { rejectValue: SerializedError; state: RootState }
>("order/createOrder", async (_, { rejectWithValue, getState }) => {
  try {
    const { cart, token } = getState();
    const order = await axios.post<IOrder>(
      `${API_URI}order`,
      {
        products: cart.map((x) => ({ _id: x._id, amount: x.amount })),
      },
      {
        headers: {
          authorization: token.token,
        },
      }
    );
    return order.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getOrder = createAsyncThunk<
  IOrder | SerializedError,
  { id: string },
  { rejectValue: SerializedError; state: RootState }
>("order/getOrder", async ({ id }, { rejectWithValue, getState }) => {
  try {
    const { token } = getState();
    const order = await axios.get<IOrder | SerializedError>(
      `${API_URI}order/${id}`,
      {
        headers: {
          authorization: token.token,
        },
      }
    );
    if (order.status !== 200)
      return rejectWithValue(order.data as SerializedError);
    return order.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getOrders = createAsyncThunk<
  IOrder[],
  void,
  { rejectValue: SerializedError; state: RootState }
>("order/getOrders", async (_, { rejectWithValue, getState }) => {
  try {
    const { token } = getState();
    const order = await axios.get<IOrder[]>(`${API_URI}order`, {
      headers: {
        authorization: token.token,
      },
    });
    return order.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload as IOrder;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const selectOrder = (state: RootState) => state.order;

export default orderSlice.reducer;
