import { CartState } from "../slices/cartSlice";

const getTotalAmount = (cart: CartState[]): number =>
  cart.reduce((a, c) => a + c.amount, 0);

export default getTotalAmount;
