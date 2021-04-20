import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { selectCart } from "../redux/slices/cartSlice";
import { CartSection } from "../screens/CartSection";

const CartPage: React.FC = () => {
  const cart = useAppSelector(selectCart);
  return (
    <div className="container">
      <CartSection cart={cart} />
    </div>
  );
};

export default CartPage;
