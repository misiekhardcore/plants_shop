import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API_URI } from "../config";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectCart } from "../redux/slices/cartSlice";
import { logout, selectUser } from "../redux/slices/userSlice";
import getTotalAmount from "../redux/utils/getTotalAmount";

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
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const { token } = useAppSelector(selectUser);

  const totalAmount = getTotalAmount(cart);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          await axios.get(`${API_URI}users/validate`, {
            headers: {
              authorization: token,
            },
          });
        } catch (error) {
          dispatch(logout());
        }
      })();
    }
  });

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
          <Link to="/products">
            <li>All products</li>
          </Link>
          <Link to="/cart">
            <li className="cart">
              Cart {totalAmount > 0 && <span>{totalAmount}</span>}
            </li>
          </Link>
          {token && (
            <Link to="/profile">
              <li>Profile</li>
            </Link>
          )}
          {token ? (
            <li onClick={() => dispatch(logout())}>Log out</li>
          ) : (
            <li>
              <Link to="/login">Log in</Link>
            </li>
          )}
        </ul>
      </nav>
    </NavbarContainer>
  );
};
