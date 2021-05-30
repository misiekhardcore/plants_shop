import React, { useEffect } from "react";
import { Container, Row } from "../components/Common";
import { Product } from "../components/Product";
import { SliderProducts } from "../components/Slider";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  getBestsellerProducts,
  selectBestsellers,
} from "../redux/slices/bestsellerSlice";
import { IGetProductsReq } from "../types/types";
import "./ProductsSection.scss";

interface ProductsSectionProps extends IGetProductsReq {
  title: string;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  limit = 12,
  offset = 0,
  title = "Products",
  search = {},
  sortBy = "SD",
}) => {
  const dispatch = useAppDispatch();
  const { error, loading, products } =
    useAppSelector(selectBestsellers);
  useEffect(() => {
    dispatch(getBestsellerProducts({ limit, offset, search, sortBy }));
    //eslint-disable-next-line
  }, [dispatch, limit, offset, sortBy]);
  return (
    <Container>
      <Row>
        <h2>{title}</h2>
        {loading && <p>Loading...</p>}
        {products && (
          <SliderProducts>
            {products.map((p) => (
              <Product key={p._id} product={p} />
            ))}
          </SliderProducts>
        )}
        {error && <p>{error.message}</p>}
      </Row>
    </Container>
  );
};
