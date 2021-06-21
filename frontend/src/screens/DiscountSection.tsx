import React, { useEffect } from "react";
import { Container, Row } from "../components/Common";
import { Product } from "../components/Product";
import { SliderProducts } from "../components/Slider";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  getDiscountProducts,
  selectDiscount,
} from "../redux/slices/discountSlice";
import { IGetProductsReq } from "../types/types";

interface DiscountSectionProps extends IGetProductsReq {
  title: string;
}

export const DiscountSection: React.FC<DiscountSectionProps> = ({
  limit = 12,
  offset = 0,
  title = "Products",
  sortBy = "NONE",
}) => {
  const dispatch = useAppDispatch();
  const { error, loading, products } = useAppSelector(selectDiscount);

  useEffect(() => {
    dispatch(getDiscountProducts({ limit, offset, sortBy }));
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
