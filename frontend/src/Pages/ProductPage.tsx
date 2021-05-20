import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getOneProduct, selectProducts } from "../redux/slices/productsSlice";

import "./ProductPage.scss";

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { productDetails, loading, error } = useAppSelector(selectProducts);

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
  } = productDetails;

  useEffect(() => {
    dispatch(getOneProduct({ id }));
  }, [id, dispatch]);

  if (loading) return <h3>Loading...</h3>;

  if (error) return <h3>{JSON.stringify(error, null, 2)}</h3>;

  return (
    <div className="container">
      <div className="row">
        <section className="product__header">
          <div className="product__images">
            <div className="image__main">
              <img src={imgURLs[0]} alt={name} />
            </div>
            <div className="image__others">
              {imgURLs.map((image, index) => (
                <img key={index} src={image} alt={name} />
              ))}
            </div>
          </div>
          <h1>{name}</h1>
        </section>
        <p>{longDescription}</p>
      </div>
    </div>
  );
};
