import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { addToCart } from "../redux/slices/cartSlice";
import { IProduct } from "../types/types";
import { Button } from "./Button";

import "./Product.scss";

interface ProductProps {
  product: IProduct;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const {
    _id,
    name,
    imgURLs,
    price,
    description,
    discount = 0,
    rating = 0,
  } = product;
  return (
    <div className="product__card">
      <Link to={`/products/${_id}`}>
        <div
          className="product__image"
          style={{
            backgroundImage: `url(${
              imgURLs[0] || "https://picsum.photos/id/111/300/200"
            })`,
          }}
        >
          <div className="dummy">
            {rating > 0 && <div className="rating"></div>}
            {discount > 0 && (
              <div className="product__discount">-{discount}%</div>
            )}
          </div>
        </div>
      </Link>
      <div className="product__info">
        <h2 className="product__title" title={name}>
          <Link to={`/products/${_id}`}>{name}</Link>
        </h2>
        <p className="product__description">
          {description.slice(0, 50)}
        </p>
        <div className="product__price">
          <p>${price}</p>
          <Button
            onClick={() =>
              dispatch(addToCart({ ...product, amount: 1 }))
            }
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};
