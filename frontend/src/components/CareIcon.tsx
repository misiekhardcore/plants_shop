import React from "react";
import styled from "styled-components";

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    max-height: 100%;
  }

  @media (max-width: 376px) {
    & {
      width: 60px;
      height: 60px;
    }
  }
`;

interface CareIconProps {
  level?: "low" | "medium" | "high";
  temperature?: number;
  type: "light" | "temp" | "water";
}

export const CareIcon: React.FC<CareIconProps> = ({
  level = "medium",
  temperature,
  type = "light",
}) => {
  if (temperature) {
    if (temperature < 16) level = "low";
    if (temperature > 23) level = "high";
    else level = "medium";
  }
  const img = `/assets/svg/${type}/${level}.svg`;
  return (
    <IconContainer>
      <img src={img} alt={type} />
    </IconContainer>
  );
};
