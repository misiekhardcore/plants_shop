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
  const { name, imgURLs, price, description } = product;
  return (
    <div className="product__card">
      <div
        className="product__image"
        style={{
          backgroundImage: `url(${
            imgURLs[0] || "https://picsum.photos/id/111/300/200"
          })`,
        }}
      >
        <div className="dummy"></div>
      </div>
      <div className="product__info">
        <h2 className="product__title" title={name}>
          {name}
        </h2>
        <p className="product__description">{description.slice(0, 50)}</p>
        <div className="product__price">
          <p>${price}</p>
          <button
            onClick={() => dispatch(addToCart({ ...product, amount: 1 }))}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
