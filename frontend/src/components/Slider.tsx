import React from "react";
import Slider from "react-slick";

const settings = {
  slidesToShow: 4,
  slidesToScroll: 4,
  speed: 500,
  infinite: false,
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
