import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { selectCart } from "../redux/slices/cartSlice";
import getTotalAmount from "../redux/utils/getTotalAmount";

import "./Navbar.scss";

export const Navbar: React.FC = () => {
  const cart = useAppSelector(selectCart);
  const totalAmount = getTotalAmount(cart);
  return (
    <div className="navbar">
      <nav>
        <Link to='/'><h1 className="logo">Plant House</h1></Link>
        <ul>
          <Link to="/cart">
            <li>Cart {totalAmount > 0 && `(${totalAmount})`}</li>
          </Link>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/logout">
            <li>Log out</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
