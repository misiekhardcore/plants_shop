import React from "react";
import { DiscountSection } from "../screens/DiscountSection";
import { Hero } from "../screens/Hero";
import { ProductsSection } from "../screens/BestsellersSection";
import { usePageTitle } from "../hooks/usePageTitle";

const MainPage: React.FC = () => {
  usePageTitle('All your favourite plants in one place')
  return (
    <>
      <Hero />
      <DiscountSection title="Sale" />
      <ProductsSection title="Bestsellers" />
    </>
  );
};

export default MainPage;
