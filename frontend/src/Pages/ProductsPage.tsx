import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Container, Row } from "../components/Common";
import { Product } from "../components/Product";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { usePageTitle } from "../hooks/usePageTitle";
import {
  getAllProducts,
  selectProducts,
} from "../redux/slices/productsSlice";
import styled from "styled-components";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  } */
`;

interface ProductsPageProps {}

const ProductsPage: React.FC<ProductsPageProps> = () => {
  const [offset, setOffset] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { error, loading, products, isNext } =
    useAppSelector(selectProducts);
  useEffect(() => {
    dispatch(
      getAllProducts({ limit: 12, offset: offset * 12, sortBy: "NA" })
    );
  }, [dispatch, offset]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [offset]);

  usePageTitle();

  if (loading) return <h3>Loading...</h3>;

  if (error) return <h3>{JSON.stringify(error, null, 2)}</h3>;

  return (
    <Container>
      <Row>
        <ProductsGrid>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </ProductsGrid>
      </Row>
      <div
        className="container row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          disabled={offset <= 0}
          onClick={() => setOffset((prev) => prev - 1)}
        >
          {"<"}
        </Button>
        <Button
          disabled={!isNext}
          onClick={() => setOffset((prev) => prev + 1)}
        >
          {">"}
        </Button>
      </div>
    </Container>
  );
};

export default ProductsPage;
