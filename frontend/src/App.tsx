import React, { useEffect } from "react";
import { Product } from "./components/Product";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
  getAllProducts,
  selectProducts,
} from "./redux/slices/productsSlice";

import "./App.scss";
import { selectCart } from "./redux/slices/cartSlice";
import { CartProduct } from "./components/CartProduct";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const dispatch = useAppDispatch();
  const { error, loading, products } = useAppSelector(selectProducts);
  const cart = useAppSelector(selectCart);
  useEffect(() => {
    dispatch(getAllProducts({ limit: 100, offset: 0, sortBy:'NA' }));
  }, [dispatch]);
  return (
    <div className="container">
      <h2>Products</h2>
      {loading && <p>Loading...</p>}
      {products && (
        <div className="products">
          {products.map((p) => (
            <Product key={p._id} product={p} />
          ))}
        </div>
      )}
      {error && <p>{error.message}</p>}
      <h2>Cart</h2>
      {!cart.length && <p>Cart is empty</p>}
      <ul className="cartproducts">
        {cart.map((c) => (
          <CartProduct key={c._id} product={c} />
        ))}
      </ul>
    </div>
  );
};

export default App;
