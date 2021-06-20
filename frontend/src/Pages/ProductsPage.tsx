import React, { useEffect, useState } from "react";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Container, Row } from "../components/Common";
import { Product } from "../components/Product";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { usePageTitle } from "../hooks/usePageTitle";
import {
  getAllProducts,
  selectProducts,
} from "../redux/slices/productsSlice";

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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  p {
    margin: 0 1rem;
  }
`;

interface ProductsPageProps {}

const ProductsPage: React.FC<ProductsPageProps> = () => {
  const [offset, setOffset] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { error, loading, products, isNext, totalCount } =
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

  if (loading)
    return (
      <Container>
        <Row>
          <h3>Loading...</h3>
        </Row>
      </Container>
    );

  if (error)
    return (
      <Container>
        <Row>
          <h3>{JSON.stringify(error, null, 2)}</h3>
        </Row>
      </Container>
    );

  return (
    <Container>
      <Row>
        <ProductsGrid>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </ProductsGrid>
      </Row>
      <ButtonsContainer>
        <Button disabled={offset <= 0} onClick={() => setOffset(0)}>
          <BsChevronDoubleLeft />
        </Button>
        <Button
          disabled={offset <= 0}
          onClick={() => setOffset((prev) => prev - 1)}
        >
          <BsChevronLeft />
        </Button>
        <p>
          {offset + 1}/{Math.ceil(totalCount / 12)}
        </p>
        <Button
          disabled={!isNext}
          onClick={() => setOffset((prev) => prev + 1)}
        >
          <BsChevronRight />
        </Button>
        <Button
          disabled={!isNext}
          onClick={() => setOffset(Math.ceil(totalCount / 12) - 1)}
        >
          <BsChevronDoubleRight />
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default ProductsPage;
