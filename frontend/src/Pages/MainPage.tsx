import React from "react";
import { DiscountSection } from "../screens/DiscountSection";
import { Hero } from "../screens/Hero";
import { ProductsSection } from "../screens/BestsellersSection";

const MainPage: React.FC = () => {
  return (
    <>
      <Hero />
      <DiscountSection title="Sale" />
      <ProductsSection title="Bestsellers" />
    </>
  );
};

export default MainPage;
