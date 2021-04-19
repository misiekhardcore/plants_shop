import React from "react";
import { useAppDispatch } from "../hooks/hooks";
import { removeFromCart } from "../redux/slices/cartSlice";
import { ICartProduct } from "../types/types";

import "./CartProduct.scss";

interface CartProductProps {
  product: ICartProduct;
}

export const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const { _id, name, amount, imgURLs, price } = product;
  const dispatch = useAppDispatch();
  return (
    <li className="cartproduct">
      <div className="cartproduct__image">
        <img
          src={imgURLs[0] || "https://picsum.photos/id/111/300/200"}
          alt={name}
        />
      </div>
      <p>{name}</p>
      <p>${price}</p>
      <p>{amount}</p>
      <button onClick={() => dispatch(removeFromCart({ id: _id }))}>X</button>
    </li>
  );
};
