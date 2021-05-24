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
  type: "light" | "temp" | "water" | "size";
}

export const CareIcon: React.FC<CareIconProps> = ({
  level = "medium",
  temperature,
  type = "light",
}) => {
  if (temperature) {
    if (temperature < 16) level = "high";
    if (temperature > 23) level = "low";
    else level = "medium";
  }
  const img = `/assets/svg/${type}/${level}.svg`;
  const tooltip: string = (() => {
    switch (type) {
      case "light":
        return "Level of light - " + level;
      case "size":
        return "Size of a plant - " + level;
      case "temp":
        return "Low temp. tolerance - " + level;
      case "water":
        return "Watering - " + level;
      default:
        return "";
    }
  })();
  return (
    <IconContainer title={tooltip}>
      <img src={img} alt={type} />
    </IconContainer>
  );
};
