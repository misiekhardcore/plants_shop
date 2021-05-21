import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { usePageTitle } from "../hooks/usePageTitle";
import { selectCart } from "../redux/slices/cartSlice";
import { CartSection } from "../screens/CartSection";

const CartPage: React.FC = () => {
  usePageTitle('Cart')
  const cart = useAppSelector(selectCart);
  return (
    <div className="container">
      <CartSection cart={cart} />
    </div>
  );
};

export default CartPage;
