import React from "react";
import styled from "styled-components";

const RatingContainer = styled.div<{ size?: "small" | "medium" | "big" }>`
  display: flex;
  align-items: center;
  width: auto;

  img {
    display: block;
    height: ${(props) => {
      switch (props.size) {
        case "small":
          return "24px";
        case "medium":
          return "32px";
        case "big":
          return "48px";
        default:
          return "32px";
      }
    }};
  }
`;

interface RatingProps {
  rating: number;
  style?: React.CSSProperties;
  size?: "small" | "medium" | "big";
}

export const Rating: React.FC<RatingProps> = ({ rating = 0, ...rest }) => {
  const wholes = Math.floor(rating / 2);
  const halves = rating % 2;
  const empty = 5 - wholes - halves;

  return (
    <RatingContainer {...rest}>
      {Array(wholes)
        .fill(0)
        .map((_, i) => (
          <img key={i} src="/assets/svg/stars/whole.svg" alt="" />
        ))}
      {Array(halves)
        .fill(0)
        .map((_, i) => (
          <img key={i} src="/assets/svg/stars/half.svg" alt="" />
        ))}
      {Array(empty)
        .fill(0)
        .map((_, i) => (
          <img key={i} src="/assets/svg/stars/empty.svg" alt="" />
        ))}
    </RatingContainer>
  );
};
