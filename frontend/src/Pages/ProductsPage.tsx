import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Product } from "../components/Product";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getAllProducts, selectProducts } from "../redux/slices/productsSlice";

interface ProductsPageProps {}

const ProductsPage: React.FC<ProductsPageProps> = () => {
  const [offset, setOffset] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { error, loading, products } = useAppSelector(selectProducts);
  console.log(products.map((p) => p._id));
  useEffect(() => {
    dispatch(getAllProducts({ limit: 12, offset: offset * 12, sortBy: "NA" }));
  }, [dispatch, offset]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [offset]);

  if (loading) return <h3>Loading...</h3>;

  if (error) return <h3>{JSON.stringify(error, null, 2)}</h3>;

  return (
    <section className="container">
      <div className="row">
        <div className="products">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}{" "}
        </div>
      </div>
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
        <Button onClick={() => setOffset((prev) => prev + 1)}>{">"}</Button>
      </div>
    </section>
  );
};

export default ProductsPage;
