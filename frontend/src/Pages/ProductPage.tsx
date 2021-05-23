import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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

import "./ProductPage.scss";

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
    size,
    rating,
    comments,
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
    <div className="container">
      <div className="row">
        <section className="product__header">
          <div className="product__image">
            <img
              className=" img large"
              onClick={() => setToggleGallery(true)}
              src={imgURLs[pictureNumber]}
              alt={name}
            />
            {discount > 0 && (
              <div className="product__discount">-{discount}%</div>
            )}
          </div>
          <article className="product__info">
            <h1 className="title">{name}</h1>
            <p className="shortDesc">{description}</p>
            <img
              className="product__image img small"
              onClick={() => setToggleGallery(true)}
              src={imgURLs[pictureNumber]}
              alt={name}
            />
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
            <div className="product__care">
              <CareIcon type="light" level={light} />
              <CareIcon type="water" level={watering} />
              <CareIcon type="temp" temperature={temperature} />
            </div>
            <div
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Rating
                rating={0}
                style={{ marginRight: "2rem" }}
                size="big"
              />
              <div style={{ display: "flex" }}>
                <p>${price}</p>
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
                <button
                  onClick={() =>
                    setInputAmount((p) => (p - 1 < 1 ? p : p - 1))
                  }
                >
                  -
                </button>
                <input
                  style={{
                    marginLeft: "1rem",
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
                <button
                  onClick={() =>
                    setInputAmount((p) =>
                      p + 1 > countInStock ? p : p + 1
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          </article>
        </section>
        <section>
          <article>
            <h2>About this product</h2>
            <p>{longDescription}</p>
          </article>
        </section>
      </div>
      {toggleGallery && (
        <ImageGallery
          images={imgURLs}
          startImg={pictureNumber}
          close={() => setToggleGallery(false)}
        />
      )}
    </div>
  );
};
