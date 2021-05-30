import styled from "styled-components";

interface ButtonProps {
  size?: "small" | "normal" | "big";
}

export const Button = styled.button<ButtonProps>`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primaryLight};
  border-radius: ${(props) => props.theme.radius.small};
  border: 1px solid ${(props) => props.theme.colors.primaryLight};
  padding: ${({ size = "normal" }) => {
    switch (size) {
      case "normal":
        return ".5rem 1rem";
      case "small":
        return ".2rem .4rem";
      case "big":
        return "0.75rem 1.5rem";
      default:
        return ".5rem 1rem";
    }
  }};
  font-size: ${({ size = "normal" }) => {
    switch (size) {
      case "normal":
        return "1rem";
      case "small":
        return ".8rem";
      case "big":
        return "1.2rem";
      default:
        return "1rem";
    }
  }};

  transition: all 0.15s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.primaryDark};
    border-color: ${(props) => props.theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${(props) => props.theme.shadow.soft};
  }

  &:disabled {
    background: gray;
    &:hover,
    &:focus {
      transform: translateX(0);
      border-color: gray;
      cursor: default;
    }
  }
`;
