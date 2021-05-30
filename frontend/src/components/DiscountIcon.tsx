import React from "react";
import styled from "styled-components";

interface DiscountIconProps {
  position?: "top" | "bottom";
  discount: number;
}
const Discount = styled.div<{ position?: "top" | "bottom" }>`
  color: white;
  position: absolute;
  height: 6rem;
  width: 6rem;
  ${(props) =>
    props.position === "bottom"
      ? "bottom: 0.5rem;"
      : props.position === "top"
      ? "top:0.5rem;"
      : "bottom: 0.5rem;"}

  right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  background-image: url("http://localhost:3000/discount.svg");
  background-size: cover;
  text-shadow: 0 1px 4px black;
`;

export const DiscountIcon: React.FC<DiscountIconProps> = ({
  position = "bottom",
  discount = 0,
}) => {
  return <Discount position={position}>-{discount}%</Discount>;
};
