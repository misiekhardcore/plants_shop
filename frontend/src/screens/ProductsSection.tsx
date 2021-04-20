import React, { useEffect } from "react";
import { Product } from "../components/Product";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getAllProducts, selectProducts } from "../redux/slices/productsSlice";

import "./ProductsSection.scss";

interface ProductsSectionProps {
  limit?: number;
  title?: string;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  limit = 4,
  title = "Products",
}) => {
  const dispatch = useAppDispatch();
  const { error, loading, products } = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getAllProducts({ limit }));
  }, [dispatch, limit]);
  return (
    <div className="container">
      <div className="row">
        <h2>{title}</h2>
        {loading && <p>Loading...</p>}
        {products && (
          <div className="products">
            {products.map((p) => (
              <Product key={p._id} product={p} />
            ))}
          </div>
        )}
        {error && <p>{error.message}</p>}
      </div>
    </div>
  );
};
