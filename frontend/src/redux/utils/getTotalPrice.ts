import { CartState } from "../slices/cartSlice";

const getTotalPrice = (cart: CartState[]): number =>
  cart.reduce((a, c) => a + c.amount * c.price, 0);

export default getTotalPrice;
