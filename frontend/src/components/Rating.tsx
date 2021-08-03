import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { rateProduct } from "../redux/slices/productsSlice";
import { selectUser } from "../redux/slices/userSlice";
import { IProduct } from "../types/types";

const RatingContainer = styled.div<{
  size?: "small" | "medium" | "big";
  absolute?: boolean;
}>`
  display: flex;
  align-items: center;
  width: auto;
  ${(props) =>
    props.absolute ? "position:absolute;bottom:0.5rem;" : ""}

  img {
    display: block;
    height: ${(props) => {
      switch (props.size) {
        case "small":
          return "24px";
        case "medium":
          return "32px";
        case "big":
          return "40px";
        default:
          return "32px";
      }
    }};

    &:hover {
      cursor: pointer;
    }

    @media (max-width: 768px) {
      height: ${(props) => {
        switch (props.size) {
          case "small":
            return props.absolute ? "24px" : "16px";
          case "medium":
            return "24px";
          case "big":
            return "32px";
          default:
            return "24px";
        }
      }};
    }
  }
`;

interface RatingProps {
  product: IProduct;
  rating: number;
  absolute?: boolean;
  style?: React.CSSProperties;
  size?: "small" | "medium" | "big";
  disabled?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  product,
  rating = 0,
  absolute = false,
  disabled,
  ...rest
}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(selectUser);
  const { isRated, _id } = product;
  const roundedRating = Math.round(rating);
  const wholes = Math.floor(roundedRating / 2);
  const halves = roundedRating % 2;
  const empty = 5 - wholes - halves;

  const stars = [
    ...Array(wholes)
      .fill(0)
      .map((_) => "/assets/svg/stars/whole.svg"),
    ...Array(halves)
      .fill(0)
      .map((_) => "/assets/svg/stars/half.svg"),
    ...Array(empty)
      .fill(0)
      .map((_) => "/assets/svg/stars/empty.svg"),
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <RatingContainer
        absolute={absolute}
        title={`${wholes}.${halves ? "5" : "0"} / 5.0`}
        {...rest}
      >
        {stars.map((star, i) => (
          <img
            key={i}
            src={star}
            alt=""
            onClick={() => {
              if (disabled) return;
              if (!token) return history.push("/login");
              if (!isRated)
                dispatch(
                  rateProduct({ product: _id, rating: (i + 1) * 2 })
                );
            }}
          />
        ))}
      </RatingContainer>
      {isRated && (
        <p
          style={{
            color: "green",
            position: "absolute",
            inset: 0,
            textAlign: "center",
          }}
        >
          You have already rated
        </p>
      )}
    </div>
  );
};
