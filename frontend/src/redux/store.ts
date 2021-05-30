import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import discountReducer from "./slices/discountSlice";
import bestsellerReducer from "./slices/bestsellerSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    cart: cartReducer,
    discount: discountReducer,
    bestsellers: bestsellerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
