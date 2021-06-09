import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { addToCart } from "../redux/slices/cartSlice";
import { IProduct } from "../types/types";
import { Button } from "./Button";
import { DiscountIcon } from "./DiscountIcon";
import styled from "styled-components";
import { Rating } from "./Rating";

const ProductCard = styled.article`
  margin: 1rem;
  min-width: 0;
  // border-radius: 8px;
  // box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const ProductImage = styled.div`
  display: flex;
  width: 100%;
  background-size: cover;
`;
const Dummy = styled.div`
  width: 100%;
  margin-top: 100%;
  padding: inherit;
  position: relative;
`;

const ProductInfo = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;

  h2,
  p {
    margin-bottom: 2rem;
  }

  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.2rem;

    a {
      color: black;
      text-decoration: none;
    }
  }

  p {
    color: gray;
  }

  @media screen and (max-width: 800px) {
    h2 {
      font-size: 1rem;
    }
    p {
      font-size: 0.75rem;
    }
  }
`;

const ProductPrice = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 1.5rem;
    margin: 0;
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

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
    <ProductCard>
      <Link to={`/products/${_id}`}>
        <ProductImage
          style={{
            backgroundImage: `url(${
              imgURLs[0] || "https://picsum.photos/id/111/300/200"
            })`,
          }}
        >
          <Dummy>
            {/* {rating > 0 && ( */}
              <Rating rating={rating} size="small" absolute />
            {/* )} */}
            {discount > 0 && (
              <DiscountIcon discount={discount} position="bottom" />
            )}
          </Dummy>
        </ProductImage>
      </Link>
      <ProductInfo>
        <h2 title={name}>
          <Link to={`/products/${_id}`}>{name}</Link>
        </h2>
        <p>{description.slice(0, 50)}</p>
        <ProductPrice>
          <p>${price}</p>
          <Button
            size="small"
            onClick={() =>
              dispatch(addToCart({ ...product, amount: 1 }))
            }
          >
            Add to cart
          </Button>
        </ProductPrice>
      </ProductInfo>
    </ProductCard>
  );
};
