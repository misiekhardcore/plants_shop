import React from "react";
import { Hero } from "../screens/Hero";
import { ProductsSection } from "../screens/ProductsSection";

const MainPage: React.FC = () => {
  return (
    <>
      <Hero />
      <ProductsSection
        title="Sale"
        offset={4}
        search={{ discount: { $gt: 0 } }}
      />
      {/* <ProductsSection title="Bestsellers" /> */}
    </>
  );
};

export default MainPage;
