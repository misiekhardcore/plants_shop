import React from "react";
import "./App.scss";
import { CartProduct } from "./components/CartProduct";
import { Navbar } from "./components/Navbar";
import { useAppSelector } from "./hooks/hooks";
import { selectCart } from "./redux/slices/cartSlice";
import { CreateProduct } from "./screens/CreateProduct";
import { Hero } from "./screens/Hero";
import { ProductsSection } from "./screens/ProductsSection";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const cart = useAppSelector(selectCart);

  return (
    <>
      <Navbar />
      <Hero />
      <ProductsSection title="Sale" />
      <ProductsSection title="Bestsellers" />
      <div className="container">
        <h2>Cart</h2>
        {!cart.length && <p>Cart is empty</p>}
        <ul className="cartproducts">
          {cart.map((c) => (
            <CartProduct key={c._id} product={c} />
          ))}
        </ul>
      </div>
      <CreateProduct />
    </>
  );
};

export default App;
