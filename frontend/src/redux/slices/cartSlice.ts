import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartProduct } from "../../types/types";
import { RootState } from "../store";

export interface CartState extends ICartProduct {}

const initialState: CartState[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartProduct>) => {
      const existing = state.find((p) => p._id === action.payload._id);
      if (existing) {
        return state.map((p) =>
          p._id === existing._id
            ? {
                ...action.payload,
                amount: p.amount + action.payload.amount,
              }
            : p
        );
      } else state.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((p) => p._id !== action.payload.id);
    },
    updateCart: (state, action: PayloadAction<ICartProduct>) => {
      if (state.find((p) => p._id === action.payload._id))
        return state.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
    },
    resetCart: (state) => {
      return (state = []);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCart,
  resetCart,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
