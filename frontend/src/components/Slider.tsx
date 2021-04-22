import React from "react";
import Slider, { CustomArrowProps } from "react-slick";
import styled from "styled-components";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Arrow = styled.div<{ side: "left" | "right" }>`
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  font-size: 2rem;
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  ${({ side }) => {
    switch (side) {
      case "left":
        return "left:0;";
      case "right":
        return "right:0;";
      default:
        return "left:0;";
    }
  }}

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.primaryDark};
  }
`;

const NextArrow = (props: CustomArrowProps) => {
  const { onClick } = props;

  return (
    <Arrow side="right" onClick={onClick}>
      <BsChevronRight />
    </Arrow>
  );
};
const PrevArrow = (props: CustomArrowProps) => {
  const { onClick } = props;

  return (
    <Arrow side="left" onClick={onClick}>
      <BsChevronLeft />
    </Arrow>
  );
};

const settings = {
  slidesToShow: 4,
  slidesToScroll: 4,
  speed: 500,
  infinite: false,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const SliderProducts: React.FC = ({ children }) => {
  return <Slider {...settings}>{children}</Slider>;
};
