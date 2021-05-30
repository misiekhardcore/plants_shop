import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Button } from "../components/Button";
import { CareIcon } from "../components/CareIcon";
import { ImageGallery } from "../components/ImageGallery";
import { Rating } from "../components/Rating";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { usePageTitle } from "../hooks/usePageTitle";
import { addToCart } from "../redux/slices/cartSlice";
import {
  getOneProduct,
  selectProducts,
} from "../redux/slices/productsSlice";
import styled from "styled-components";

import "./ProductPage.scss";
import { DiscountIcon } from "../components/DiscountIcon";
import { Container, Row } from "../components/Common";

const RatingAndAddToCartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1050px) {
    flex-direction: column;
  }
`;

const AddToCartContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const PlusMinusButton = styled.button`
  padding: 6px;
  background: none;
  border: none;

  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

const Price = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { productDetails, loading, error } =
    useAppSelector(selectProducts);
  const [pictureNumber, setPictureNumber] = useState<number>(0);
  const [toggleGallery, setToggleGallery] = useState<boolean>(false);
  const [inputAmount, setInputAmount] = useState<number>(1);

  const {
    name,
    price,
    discount,
    imgURLs,
    longDescription,
    temperature,
    watering,
    light,
    rating,
    countInStock,
    description,
  } = productDetails;

  useEffect(() => {
    dispatch(getOneProduct({ id }));
  }, [id, dispatch]);

  usePageTitle(name);

  if (loading) return <h3>Loading...</h3>;

  if (error) return <h3>{JSON.stringify(error, null, 2)}</h3>;

  return (
    <Container>
      <Row>
        <section className="product__header">
          <div className="product__image large">
            <img
              className=" img"
              onClick={() => setToggleGallery(true)}
              src={imgURLs[pictureNumber]}
              alt={name}
            />
            {discount > 0 && (
              <DiscountIcon discount={discount} position="top" />
            )}
          </div>
          <article className="product__info">
            <h1 className="title">{name}</h1>
            <p className="shortDesc">{description}</p>
            <div className="product__image small">
              <img
                className=" img"
                onClick={() => setToggleGallery(true)}
                src={imgURLs[pictureNumber]}
                alt={name}
              />
              {discount > 0 && (
                <DiscountIcon discount={discount} position="bottom" />
              )}
            </div>
            <div className="product__images">
              {imgURLs.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={name}
                  onClick={() => setPictureNumber(index)}
                  className="img"
                />
              ))}
            </div>
            <h3>Care info:</h3>
            <div className="product__care">
              <CareIcon type="light" level={light} />
              <CareIcon type="water" level={watering} />
              <CareIcon type="temp" temperature={temperature} />
            </div>
            <RatingAndAddToCartContainer>
              <Rating rating={rating} size="big" />
              <AddToCartContainer>
                <Price>${price}</Price>
                <div style={{ display: "flex" }}>
                  <PlusMinusButton
                    onClick={() =>
                      setInputAmount((p) => (p - 1 < 1 ? p : p - 1))
                    }
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
                    value={inputAmount}
                    onChange={(e) => setInputAmount(+e.target.value)}
                  />
                  <PlusMinusButton
                    style={{
                      background: "none",
                      border: "none",
                      padding: "6px",
                    }}
                    onClick={() =>
                      setInputAmount((p) =>
                        p + 1 > countInStock ? p : p + 1
                      )
                    }
                  >
                    <AiOutlinePlus />
                  </PlusMinusButton>
                </div>
                <Button
                  size="normal"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        ...productDetails,
                        amount: inputAmount,
                      })
                    )
                  }
                >
                  add to cart
                </Button>
              </AddToCartContainer>
            </RatingAndAddToCartContainer>
          </article>
        </section>
        <section>
          <article>
            <h2>About this product</h2>
            <p>{longDescription}</p>
          </article>
        </section>
      </Row>
      {toggleGallery && (
        <ImageGallery
          images={imgURLs}
          startImg={pictureNumber}
          close={() => setToggleGallery(false)}
        />
      )}
    </Container>
  );
};
