import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import styled from "styled-components";

const HeroContainer = styled.div`
  width: 100%;
  height: 500px;
  background: url("https://images.photowall.com/products/58131/jungle-plants.jpg?h=699&q=85")
    #000;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  box-shadow: ${(props) => props.theme.shadow.medium};

  @media (max-width: 414px) {
    .hero__cta {
      width: 100%;
      flex: 1;
    }
    .hero__dark {
      display: none;
    }
  }
`;

const HeroDark = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  flex: 0.7;

  @media (max-width: 414px) {
    display: none;
  }
`;

const HeroCta = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  margin-left: auto;
  min-width: 25rem;
  padding: 5rem;
  height: 100%;
  flex: 0.3;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2,
  button {
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  a {
    color: ${(props) => props.theme.colors.primaryLight};
    font-size: 0.85rem;
  }

  @media (max-width: 414px) {
    width: 100%;
    min-width: 0;
    flex: 1;
  }
`;

export const Hero: React.FC = () => {
  return (
    <HeroContainer>
      <HeroDark />
      <HeroCta>
        <h2>Find plants that will suit your place</h2>
        <Link to="/products">
          <Button>Start searching</Button>
        </Link>
        <a href="/">Check how it works</a>
      </HeroCta>
    </HeroContainer>
  );
};
