import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import styled from "styled-components";

const FooterContainer = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  min-height: 10rem;
  background-color: ${(props) => props.theme.colors.primaryDark};
  overflow: hidden;
  color: ${(props) => props.theme.colors.primaryLight};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 100;
  gap: 1rem;

  span {
    width: 3px;
    height: 100%;
    background-color: red;
  }

  ul {
    list-style: none;
  }
`;

const BGimg = styled.img<{ side?: "left" | "right" }>`
  position: absolute;
  z-index: 0;
  ${({ side }) =>
    side === "right"
      ? "bottom:-2rem;right:-4rem;transform: rotateZ(180deg) scale(1.5);"
      : "bottom:-4rem;left:-4rem"};

  @media (max-width: 768px) {
    ${({ side }) => (side === "right" ? "display:none" : "")}
  }
`;

const SocialIcon = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  border-radius: 50%;
  padding: 0.25rem;

  & + li {
    margin-top: 0.25rem;
  }

  a {
    color: inherit;
    svg {
      float: left;
    }
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <BGimg side="left" src="/assets/svg/Footer.svg" alt="" />
      <footer>
        <FooterGrid>
          <ul>
            <SocialIcon>
              <a href="mailto:contact@planthouse.com">
                <HiOutlineMail />
              </a>
            </SocialIcon>
            <SocialIcon>
              <a
                href="https://facebook.com/planthouse"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>
            </SocialIcon>
            <SocialIcon>
              <a
                href="https://instagram.com/planthouse"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
            </SocialIcon>
          </ul>
          <span></span>
          <ul>
            <li>PlantHouse LLC</li>
            <li>1001 Commercial Ave.</li>
            <li>Oxnard, CA 93030</li>
            <li>phone: 111-222-3333</li>
          </ul>
        </FooterGrid>
      </footer>
      <BGimg side="right" src="/assets/svg/Footer.svg" alt="" />
    </FooterContainer>
  );
};
