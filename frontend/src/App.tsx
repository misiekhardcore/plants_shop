import React, { useEffect } from "react";
import { Product } from "./components/Product";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { getAllProducts, selectProducts } from "./redux/slices/productsSlice";

import "./App.scss";
import { selectCart } from "./redux/slices/cartSlice";
import getTotalAmount from "./redux/utils/getTotalAmount";
import getTotalPrice from "./redux/utils/getTotalPrice";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const dispatch = useAppDispatch();
  const { error, loading, products } = useAppSelector(selectProducts);
  const cart = useAppSelector(selectCart);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      {products && (
        <div className="products">
          {products.map((p) => (
            <Product key={p._id} product={p} />
          ))}
        </div>
      )}
      {error && <p>{error.message}</p>}
      <div className="">
        {cart.map((c) => (
          <p>{`${c._id} ${c.amount}`}</p>
        ))}
      </div>
      <p>{getTotalAmount(cart)}</p>
      <p>${getTotalPrice(cart)}</p>
    </div>
  );
};

export default App;
