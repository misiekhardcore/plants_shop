import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import discountReducer from "./slices/discountSlice";
import bestsellerReducer from "./slices/bestsellerSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    discount: discountReducer,
    bestsellers: bestsellerReducer,
    token: userReducer,
    order: orderReducer,
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
