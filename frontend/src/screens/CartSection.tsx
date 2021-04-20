import React from "react";
import { CartProduct } from "../components/CartProduct";
import { ICartProduct } from "../types/types";

interface CartSectionProps {
  cart: ICartProduct[];
}

export const CartSection: React.FC<CartSectionProps> = ({ cart = [] }) => {
  return (
    <>
      <h2>Cart</h2>
      {!cart.length && <p>Cart is empty</p>}
      <ul className="cartproducts">
        {cart.map((c) => (
          <CartProduct key={c._id} product={c} />
        ))}
      </ul>
    </>
  );
};
