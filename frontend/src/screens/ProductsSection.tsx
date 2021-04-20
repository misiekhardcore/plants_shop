import React, { useEffect } from "react";
import { Product } from "../components/Product";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  getAllProducts,
  selectProducts,
} from "../redux/slices/productsSlice";
import { IGetProductsReq } from "../types/types";

import "./ProductsSection.scss";

interface ProductsSectionProps extends IGetProductsReq {
  title: string;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  limit = 4,
  offset = 0,
  title = "Products",
  search = {},
  sortBy = "NONE",
}) => {
  const dispatch = useAppDispatch();
  const { error, loading, products } = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getAllProducts({ limit, offset, search, sortBy }));
  }, [dispatch, limit, offset, search, sortBy]);
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
