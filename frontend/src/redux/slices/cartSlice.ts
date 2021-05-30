import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartProduct } from "../../types/types";
import { RootState } from "../store";

export interface CartState extends ICartProduct {}

const initialState: CartState[] = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "")
  : [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartProduct>) => {
      const existing = state.find((p) => p._id === action.payload._id);
      let newCart: CartState[];
      if (existing) {
        newCart = state.map((p) =>
          p._id === existing._id
            ? {
                ...action.payload,
                amount: p.amount + action.payload.amount,
              }
            : p
        );
      } else newCart = [...state, action.payload];

      localStorage.setItem("cart", JSON.stringify(newCart));

      return newCart;
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const newCart = state.filter((p) => p._id !== action.payload.id);
      
      if (newCart.length === 0) localStorage.removeItem("cart");
      else localStorage.setItem("cart", JSON.stringify(newCart));

      return newCart;
    },
    updateCart: (
      state,
      action: PayloadAction<{ _id: string; amount: number }>
    ) => {
      if (state.find((p) => p._id === action.payload._id)) {
        const newCart = state.map((p) =>
          p._id === action.payload._id
            ? { ...p, amount: action.payload.amount }
            : p
        );

        localStorage.setItem("cart", JSON.stringify(newCart));

        return newCart;
      }
    },
    resetCart: (state) => {
      localStorage.removeItem("cart");
      return (state = []);
    },
  },
});

export const { addToCart, removeFromCart, updateCart, resetCart } =
  cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
