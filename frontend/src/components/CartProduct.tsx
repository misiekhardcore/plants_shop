import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { PlusMinusButton } from "../Pages/ProductPage";
import { removeFromCart, updateCart } from "../redux/slices/cartSlice";
import { ICartProduct } from "../types/types";
import { Button } from "./Button";
import styled from "styled-components";

const Product = styled.li`
  display: grid;
  grid-template-columns: 100px 2fr 1fr 1fr auto;
  justify-items: center;
  align-items: center;
  margin-bottom: 1rem;
  // border: 1px solid red;
  height: 100px;

  img {
    object-fit: cover;
    display: block;
    width: 100%;
    max-height: 100%;
  }
`;

interface CartProductProps {
  product: ICartProduct;
}

export const CartProduct: React.FC<CartProductProps> = ({
  product,
}) => {
  const {
    _id,
    name,
    amount,
    imgURLs = [],
    price,
    countInStock,
  } = product;
  const dispatch = useAppDispatch();

  return (
    <Product>
      <img
        src={imgURLs[0] || "https://picsum.photos/id/111/300/200"}
        alt={name}
      />
      <Link to={`/products/${_id}`}>
        <p>{name}</p>
      </Link>
      <p>${price}</p>
      <div style={{ display: "flex" }}>
        <PlusMinusButton
          disabled={amount <= 1}
          onClick={() => {
            dispatch(
              updateCart({
                _id,
                amount: amount > 1 ? amount - 1 : 1,
              })
            );
          }}
        >
          <AiOutlineMinus />
        </PlusMinusButton>
        <input
          style={{
            minWidth: "0px",
            width: "3rem",
          }}
          type="number"
          min={1}
          max={countInStock}
          step={1}
          value={amount}
          onChange={(e) => {
            dispatch(
              updateCart({
                _id,
                amount:
                  +e.target.value > countInStock
                    ? countInStock
                    : +e.target.value < 1
                    ? 1
                    : +e.target.value,
              })
            );
          }}
        />
        <PlusMinusButton
          disabled={amount >= countInStock}
          style={{
            background: "none",
            border: "none",
            padding: "6px",
          }}
          onClick={() => {
            dispatch(
              updateCart({
                _id,
                amount:
                  amount < countInStock ? amount + 1 : countInStock,
              })
            );
          }}
        >
          <AiOutlinePlus />
        </PlusMinusButton>
      </div>
      <Button onClick={() => dispatch(removeFromCart({ id: _id }))}>
        X
      </Button>
    </Product>
  );
};
