import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Button } from "../components/Button";
import { CareIcon } from "../components/CareIcon";
import { ImageGallery } from "../components/ImageGallery";
import { Rating } from "../components/Rating";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { usePageTitle } from "../hooks/usePageTitle";
import { addToCart, selectCart } from "../redux/slices/cartSlice";
import {
  getOneProduct,
  selectProducts,
} from "../redux/slices/productsSlice";
import styled from "styled-components";

import { DiscountIcon } from "../components/DiscountIcon";
import {
  CenterContainer,
  Container,
  Loading,
  Row,
} from "../components/Common";

const ProductHeader = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImageContainer = styled.div<{ size?: "small" | "large" }>`
  height: 500px;
  position: relative;

  ${(props) =>
    props.size === "large"
      ? `@media (max-width: 768px) {
        display: none;
      }`
      : props.size === "small"
      ? `img {
      height: 100%;
    }
    @media (min-width: 769px) {
        display: none;
    }`
      : null}
`;

const ProductImage = styled.img`
  border-radius: 4px;
  display: block;
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.black};

  &:hover,
  &focus {
    opacity: 0.8;
  }
`;

const ProductImages = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;

  img {
    display: flex;
    object-fit: cover;
    height: 100px;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProductInfo = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: auto;
  line-height: 1.5;
`;

const ProductTitle = styled.h1`
  text-align: center;
  font-size: 2rem;

  @media (max-width: 414px) {
    font-size: 1.5rem;
  }
`;

const ProductShortDesc = styled.p`
  color: ${(props) => props.theme.colors.gray};
`;

const ProductCare = styled.div`
  h3 {
    display: block;
    width: 100%;
  }
  display: flex;
  justify-content: space-around;
`;

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

  &:disabled {
    cursor: default;
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

  const cart = useAppSelector(selectCart);

  const {
    _id,
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

  const itemInCart = cart.find((p) => p._id === _id);
  const isAvailable =
    countInStock - (itemInCart ? itemInCart.amount : 0);

  useEffect(() => {
    dispatch(getOneProduct({ id }));
  }, [id, dispatch]);

  usePageTitle(name);

  if (loading)
    return (
      <CenterContainer>
        <Loading isLoading={true} />
      </CenterContainer>
    );

  if (error)
    return (
      <CenterContainer>
        <h3>{JSON.stringify(error, null, 2)}</h3>
      </CenterContainer>
    );

  return (
    <Container>
      <Row>
        <ProductHeader>
          <ProductImageContainer size="large">
            <ProductImage
              onClick={() => setToggleGallery(true)}
              src={imgURLs[pictureNumber]}
              alt={name}
            />
            {discount > 0 && (
              <DiscountIcon discount={discount} position="top" />
            )}
          </ProductImageContainer>
          <ProductInfo>
            <ProductTitle>{name}</ProductTitle>
            <ProductShortDesc>{description}</ProductShortDesc>
            <ProductImageContainer size="small">
              <ProductImage
                onClick={() => setToggleGallery(true)}
                src={imgURLs[pictureNumber]}
                alt={name}
              />
              {discount > 0 && (
                <DiscountIcon discount={discount} position="bottom" />
              )}
            </ProductImageContainer>
            <ProductImages>
              {imgURLs.map((image, index) => (
                <ProductImage
                  key={index}
                  src={image}
                  alt={name}
                  onClick={() => setPictureNumber(index)}
                />
              ))}
            </ProductImages>
            <h3>Care info:</h3>
            <ProductCare>
              <CareIcon type="light" level={light} />
              <CareIcon type="water" level={watering} />
              <CareIcon type="temp" temperature={temperature} />
            </ProductCare>
            <RatingAndAddToCartContainer>
              <Rating
                product={productDetails}
                rating={rating}
                size="big"
              />
              <AddToCartContainer>
                <Price>${price}</Price>
                <div style={{ display: "flex" }}>
                  <PlusMinusButton
                    disabled={!isAvailable || inputAmount <= 1}
                    onClick={() =>
                      setInputAmount((p) => (p - 1 < 1 ? p : p - 1))
                    }
                  >
                    <AiOutlineMinus />
                  </PlusMinusButton>
                  <input
                    disabled={!isAvailable}
                    style={{
                      minWidth: "0px",
                      width: "3rem",
                    }}
                    type="number"
                    min={1}
                    max={isAvailable}
                    step={1}
                    value={inputAmount}
                    onChange={(e) =>
                      setInputAmount(
                        +e.target.value > isAvailable
                          ? isAvailable
                          : +e.target.value < 1
                          ? 1
                          : +e.target.value
                      )
                    }
                  />
                  <PlusMinusButton
                    disabled={
                      !isAvailable || inputAmount >= isAvailable
                    }
                    style={{
                      background: "none",
                      border: "none",
                      padding: "6px",
                    }}
                    onClick={() =>
                      setInputAmount((p) =>
                        p + 1 > isAvailable ? p : p + 1
                      )
                    }
                  >
                    <AiOutlinePlus />
                  </PlusMinusButton>
                </div>
                <Button
                  disabled={!isAvailable}
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
          </ProductInfo>
        </ProductHeader>
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
