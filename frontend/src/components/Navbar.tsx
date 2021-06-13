import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { selectCart } from "../redux/slices/cartSlice";
import getTotalAmount from "../redux/utils/getTotalAmount";
import styled from "styled-components";

const NavbarContainer = styled.div`
  width: 100%;
  color: white;
  background-color: ${(props) => props.theme.colors.primaryDark};
  position: sticky;
  top: 0;
  z-index: 100;

  a {
    color: inherit;
    text-decoration: inherit;
  }

  nav {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      display: flex;
    }
    h1 {
      font-family: "Marck Script", cursive;
      padding: 1rem;
    }

    ul {
      list-style: none;
      display: flex;
      height: 100%;

      li {
        display: flex;
        padding: 1rem;
        cursor: pointer;

        &:hover,
        &:focus {
          background-color: $primary-light;
        }

        &.cart {
          span {
            font-size: 0.8rem;
            margin-left: 0.5rem;
            padding: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            width: 1.2rem;
            height: 1.2rem;
            background-color: red;
          }
        }
      }
    }
  }
`;

export const Navbar: React.FC = () => {
  const cart = useAppSelector(selectCart);
  const totalAmount = getTotalAmount(cart);
  return (
    <NavbarContainer>
      <nav>
        <Link to="/">
          <div className="logo">
            <img src="/assets/svg/Logo.svg" alt="Logo" />
            <h1>Plant House</h1>
          </div>
        </Link>
        <ul>
          <Link to="/cart">
            <li className="cart">
              Cart {totalAmount > 0 && <span>{totalAmount}</span>}
            </li>
          </Link>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/login">
            <li>Log in</li>
          </Link>
        </ul>
      </nav>
    </NavbarContainer>
  );
};
