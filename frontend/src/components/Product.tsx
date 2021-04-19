import React from "react";
import { useAppDispatch } from "../hooks/hooks";
import { addToCart } from "../redux/slices/cartSlice";
import { IProduct } from "../types/types";

import "./Product.scss";

interface ProductProps {
  product: IProduct;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { name, imgURLs, price } = product;
  return (
    <div className="product__card">
      <div className="product__image">
        <img
          src={imgURLs[0] || "https://picsum.photos/id/111/300/200"}
          alt={name}
        />
      </div>
      <h2 className="product__title">{name}</h2>
      <p className="product__price">{price}</p>
      <button onClick={() => dispatch(addToCart({...product,amount:1}))}>Add to cart</button>
    </div>
  );
};
