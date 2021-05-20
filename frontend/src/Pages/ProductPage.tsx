import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getOneProduct, selectProducts } from "../redux/slices/productsSlice";

interface ProductPageProps {}

export const ProductPage: React.FC<ProductPageProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { productDetails, loading, error } = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getOneProduct({ id }));
  }, [id]);

  if (loading) return <h3>Loading...</h3>;

  if (error) return <h3>{JSON.stringify(error, null, 2)}</h3>;

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
  return (
    <div className="div">
      <img src={imgURLs[0]} alt={name} />
      <h1>{name}</h1>
      <p>{longDescription}</p>
    </div>
  );
};
