import { CartState } from "../slices/cartSlice";

const getTotalPrice = (cart: CartState[]): number =>
  Math.floor(cart.reduce((a, c) => a + c.amount * c.price, 0) * 100) /
  100;

export default getTotalPrice;
