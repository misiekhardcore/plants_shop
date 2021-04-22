import React, { useEffect, useState } from "react";
import { ProductsSection } from "../screens/BestsellersSection";

interface ProductsPageProps {}

const ProductsPage: React.FC<ProductsPageProps> = () => {
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [offset])

  return (
    <>
      <ProductsSection title={"All Products"} limit={20} offset={offset} />
      <button
        disabled={offset <= 0}
        onClick={() => setOffset((prev) => prev - 1)}
      >
        {"<"}
      </button>
      <button onClick={() => setOffset((prev) => prev + 1)}>{">"}</button>
    </>
  );
};

export default ProductsPage;
