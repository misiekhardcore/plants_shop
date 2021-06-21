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
import { sortByEnum } from "../types/types";

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

const FilterContainer = styled(Row)`
  display: flex;
  gap: 1rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

interface ProductsPageProps {}

const ProductsPage: React.FC<ProductsPageProps> = () => {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState(12);
  const [sortBy, setSortBy] = useState<sortByEnum>("NONE");

  const dispatch = useAppDispatch();
  const { error, loading, products, isNext, totalCount } =
    useAppSelector(selectProducts);
  useEffect(() => {
    dispatch(getAllProducts({ limit, offset: offset * limit, sortBy }));
  }, [dispatch, offset, limit, sortBy]);

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
      <FilterContainer>
        <Label>
          On page:
          <select
            value={limit}
            name="limit"
            id="limit"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setLimit(+e.target.value)
            }
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
        </Label>
        <Label>
          Sort by:
          <select
            style={{ width: "100%" }}
            value={sortBy}
            name="sortBy"
            id="sortBy"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortBy(e.target.value as sortByEnum)
            }
          >
            <option value="NONE">None</option>
            <option value="NA">Name ascending</option>
            <option value="ND">Name descending</option>
            <option value="PA">Price Ascending</option>
            <option value="PD">Price Descending</option>
            <option value="RA">Rating ascending</option>
            <option value="RD">Rating descending</option>
            <option value="SA">Popularity ascending</option>
            <option value="SD">Popularity descending</option>
          </select>
        </Label>
      </FilterContainer>
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
          {offset + 1}/{Math.ceil(totalCount / limit)}
        </p>
        <Button
          disabled={!isNext}
          onClick={() => setOffset((prev) => prev + 1)}
        >
          <BsChevronRight />
        </Button>
        <Button
          disabled={!isNext}
          onClick={() => setOffset(Math.ceil(totalCount / limit) - 1)}
        >
          <BsChevronDoubleRight />
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default ProductsPage;
